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

        [HttpPost(Name = "AddProduct")]
        public async Task<IActionResult> AddProduct([FromBody] Product newProduct)
        {
            var created = await _productService.AddProductAsync(newProduct);

            if (created != null)
                return Ok(created);

            return BadRequest("Failed to add product");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Product updated)
        {
            var product = await _productService.UpdateProductAsync(id, updated);

            if (product != null)
                return Ok(product);

            return BadRequest("Failed to update product");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _productService.DeleteProductAsync(id);

            if (deleted)
                return NoContent();

            return NotFound($"Product with ID {id} not found or could not be deleted");
        }
        
    }
}
