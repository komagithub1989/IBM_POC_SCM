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
    }
}
