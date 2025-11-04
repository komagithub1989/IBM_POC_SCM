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
    }
}
