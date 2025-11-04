using System;
using SCM_WebApi.Models;

namespace SCM_WebApi.Services
{
    public class ProductService
    {
         private readonly HttpClient _httpClient;
        private readonly string _baseUrl;
        public ProductService(HttpClient httpClient, IConfiguration config)
        {
            _httpClient = httpClient;
            _baseUrl = config["JsonServer:BaseUrl"] ?? "http://localhost:5001"; // fallback
        }
        
         public async Task<List<Product>> GetProductsAsync()
        {
            var inventory = await _httpClient.GetFromJsonAsync<List<Product>>($"{_baseUrl}/products");
            return inventory ?? new List<Product>();
        }
    }
}
