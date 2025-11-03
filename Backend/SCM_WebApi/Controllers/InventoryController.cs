using System;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using SCM_WebApi.Models;
using SCM_WebApi.Services;

namespace SCM_WebApi.Controllers
{
    [ApiController]
    [Microsoft.AspNetCore.Mvc.Route("[controller]")]
    public class InventoryController : ControllerBase
    {
        private readonly InventoryService _inventoryService;
        public InventoryController(InventoryService inventoryService)
        {
            _inventoryService = inventoryService;
        }
        [HttpGet(Name = "GetInventory")]
        public async Task<IEnumerable<InventoryItem>> Get()
        {
            return await _inventoryService.GetInventoryAsync();
        }
    }
}
