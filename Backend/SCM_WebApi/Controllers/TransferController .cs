using System;
using Microsoft.AspNetCore.Mvc;
using SCM_WebApi.Models;
using SCM_WebApi.Services;

namespace SCM_WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransferController : ControllerBase
    {
        private readonly InventoryService _inventoryService;

        public TransferController(InventoryService inventoryService)
        {
            _inventoryService = inventoryService;
        }

        [HttpPost]
        public async Task<IActionResult> Transfer([FromBody] TransferRequest req)
        {
            try
            {
                await _inventoryService.TransferAsync(req.FromWarehouse, req.ToWarehouse, req.ProductId, req.Quantity);
                return Ok(new { message = "Transfer successful" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
    }
}
