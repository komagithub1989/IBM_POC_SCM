using System;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using SCM_WebApi.Models;
using SCM_WebApi.Services;

namespace SCM_WebApi.Controllers
{
    [ApiController]
    [Microsoft.AspNetCore.Mvc.Route("api/[controller]")]
    public class InventoryController : ControllerBase
    {
        private readonly InventoryService _inventoryService;
        public InventoryController(InventoryService inventoryService)
        {
            _inventoryService = inventoryService;
        }
        [HttpGet("GetInventory")]
        public async Task<IEnumerable<InventoryItem>> GetInventories()
        {
            return await _inventoryService.GetInventoryAsync();
        }

        [HttpGet("GetInventory_v2")]
        public async Task<IEnumerable<ExtendedInventoryItem>> GetInventoriesV2()
        {
            return await _inventoryService.GetInventoryItemsAsync();
        }

        [HttpGet("Summery")]
        public async Task<IEnumerable<object>> GetInventorySummary()
        {
            return await _inventoryService.GetInventorySummary();
        }
    }
}
