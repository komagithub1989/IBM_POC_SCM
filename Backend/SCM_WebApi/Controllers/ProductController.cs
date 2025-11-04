using System;
using Microsoft.AspNetCore.Mvc;
using SCM_WebApi.Models;
using SCM_WebApi.Services;

namespace SCM_WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController(ProductService productService) : ControllerBase
    {
        private readonly ProductService _productService = productService;

        [HttpGet(Name = "GetProducts")]
        public async Task<IEnumerable<Product>> GetProducts()
        {
            return await _productService.GetProductsAsync();
        }
    }
}
