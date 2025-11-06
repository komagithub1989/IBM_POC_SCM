using SCM_WebApi.Models;

namespace SCM_WebApi.Services
{
    public class ProductService(HttpClient httpClient, IConfiguration config)
    {
        private readonly HttpClient _httpClient = httpClient;
        private readonly string _baseUrl = config["JsonServer:BaseUrl"] ?? "http://localhost:5001";

        public async Task<List<Product>> GetProductsAsync()
        {
            var inventory = await _httpClient.GetFromJsonAsync<List<Product>>($"{_baseUrl}/products");
            return inventory ?? [];
        }

        public async Task<Product?> AddProductAsync(Product newProduct)
        {
            var response = await _httpClient.PostAsJsonAsync($"{_baseUrl}/products", newProduct);

            if (response.IsSuccessStatusCode)
            {
                return await response.Content.ReadFromJsonAsync<Product>();
            }

            return null; 
        }
       
        public async Task<Product?> GetProductByIdAsync(int id)
        {
            return await _httpClient.GetFromJsonAsync<Product>($"{_baseUrl}/products/{id}");
        }

        // Optional: Update a product
        public async Task<bool> UpdateProductAsync(int id, Product updated)
        {
            var response = await _httpClient.PutAsJsonAsync($"{_baseUrl}/products/{id}", updated);
            return response.IsSuccessStatusCode;
        }

        // Optional: Delete a product
        public async Task<bool> DeleteProductAsync(int id)
        {
            var response = await _httpClient.DeleteAsync($"{_baseUrl}/products/{id}");
            return response.IsSuccessStatusCode;
        }

    }
}
