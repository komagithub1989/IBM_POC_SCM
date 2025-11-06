using System;
using SCM_WebApi.Models;

namespace SCM_WebApi.Services
{
    public class WareHouseService(HttpClient httpClient, IConfiguration config)
    {
        private readonly HttpClient _httpClient = httpClient;
        private readonly string _baseUrl = config["JsonServer:BaseUrl"] ?? "http://localhost:5001"; // fallback

        public async Task<List<Warehouse>> GetWarehouseAsync()
        {
            var inventory = await _httpClient.GetFromJsonAsync<List<Warehouse>>($"{_baseUrl}/warehouses");
            return inventory ?? new List<Warehouse>();
        }

        public async Task<Warehouse?> AddWarehouseAsync(Warehouse warehouse)
        {
            var response = await _httpClient.PostAsJsonAsync($"{_baseUrl}/warehouses", warehouse);
            if (response.IsSuccessStatusCode)
            {
                return await response.Content.ReadFromJsonAsync<Warehouse>();
            }
            return null;
        }

        public async Task<bool> UpdateWarehouseAsync(int id, Warehouse updated)
        {
            var response = await _httpClient.PutAsJsonAsync($"{_baseUrl}/warehouses/{id}", updated);
            return response.IsSuccessStatusCode;
        }

        public async Task<bool> DeleteWarehouseAsync(int id)
        {
            var response = await _httpClient.DeleteAsync($"{_baseUrl}/warehouses/{id}");
            return response.IsSuccessStatusCode;
        }
    }
}
