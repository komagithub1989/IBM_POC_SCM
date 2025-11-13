using System.Net.Http.Json;
using Microsoft.Extensions.Configuration;
using SCM_WebApi.Models;

namespace SCM_WebApi.Services
{

    public class InventoryService
    {
        private readonly HttpClient _httpClient;
        private readonly string _baseUrl;
        public InventoryService(HttpClient httpClient, IConfiguration config)
        {
            _httpClient = httpClient;
            _baseUrl = config["JsonServer:BaseUrl"] ?? "http://localhost:5001"; // fallback
        }
        public async Task<List<InventoryItem>> GetInventoryAsync()
        {
            var inventory = await _httpClient.GetFromJsonAsync<List<InventoryItem>>($"{_baseUrl}/inventory");
            return inventory ?? new List<InventoryItem>();
        }

        public async Task<List<ExtendedInventoryItem>> GetInventoryItemsAsync()
        {
            var inventory = await _httpClient.GetFromJsonAsync<List<ExtendedInventoryItem>>($"{_baseUrl}/inventory?_expand=product&_expand=warehouse");
            return inventory ?? new List<ExtendedInventoryItem>();
        }

        public async Task TransferAsync(int fromWarehouse, int toWarehouse, int productId, int quantity)
        {
            var inventory = await GetInventoryAsync();

            var fromItem = inventory.FirstOrDefault(i => i.WarehouseId == fromWarehouse && i.ProductId == productId);
            var toItem = inventory.FirstOrDefault(i => i.WarehouseId == toWarehouse && i.ProductId == productId);

            if (fromItem == null || fromItem.Quantity < quantity)
                throw new Exception("Insufficient stock in source warehouse");

            fromItem.Quantity -= quantity;

            if (toItem != null)
                toItem.Quantity += quantity;
            else
                inventory.Add(new InventoryItem
                {
                    Id = $"{toWarehouse}-{productId}",
                    WarehouseId = toWarehouse,
                    ProductId = productId,
                    Quantity = quantity
                });

            await SaveInventoryAsync(inventory);
        }

        private async Task SaveInventoryAsync(List<InventoryItem> inventory)
        {
            foreach (var item in inventory)
            {
                var encodedId = Uri.EscapeDataString(item.Id);
                var putResponse = await _httpClient.PutAsJsonAsync($"{_baseUrl}/inventory/{encodedId}", item);

                if (!putResponse.IsSuccessStatusCode)
                {
                    // If not found, create new item
                    if (putResponse.StatusCode == System.Net.HttpStatusCode.NotFound)
                    {
                        var postResponse = await _httpClient.PostAsJsonAsync($"{_baseUrl}/inventory", item);
                        postResponse.EnsureSuccessStatusCode();
                    }
                    else
                    {
                        // Throw if something else went wrong
                        putResponse.EnsureSuccessStatusCode();
                    }
                }
            }
        }

        public async Task<IEnumerable<object>> GetInventorySummary()
        {
            var inventory = await _httpClient.GetFromJsonAsync<List<ExtendedInventoryItem>>(
        $"{_baseUrl}/inventory?_expand=product&_expand=warehouse");
            var summary = inventory?
            .GroupBy(i => i.Product?.Name)
            .Select(g => new
            {
                Product = g.Key,
                TotalQuantity = g.Sum(x => x.Quantity)
            });
            return summary ?? null;
        }
    }
}
