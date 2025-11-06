using System;
using Microsoft.AspNetCore.Mvc;
using SCM_WebApi.Models;
using SCM_WebApi.Services;

namespace SCM_WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WarehouseController(WareHouseService wareHouseService) : ControllerBase
    {
        private readonly WareHouseService _warehouseService = wareHouseService;

        [HttpGet(Name = "GetWarehouses")]
        public async Task<IEnumerable<Warehouse>> GetWarehouses()
        {
            return await _warehouseService.GetWarehouseAsync();
        }

        [HttpPost(Name = "AddWareHouse")]
        public async Task<IActionResult> AddWarehouse([FromBody] Warehouse warehouse)
        {
            var response = await _warehouseService.AddWarehouseAsync(warehouse);
            if (response != null)
            {
                return Ok(response);
            }
            return BadRequest("Failed to add warehouse");
        }

        [HttpPut(Name = "UpdateWareHouse")]
        public async Task<IActionResult> UpdateWarehouse([FromBody] Warehouse warehouse, int id)
        {
            var response = await _warehouseService.UpdateWarehouseAsync(id, warehouse);
            if (response)
            {
                return Ok("Updated");
            }
            return BadRequest("Failed to update warehouse");
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _warehouseService.DeleteWarehouseAsync(id);

            if (deleted)
                return NoContent();

            return NotFound($"Watrehouse with ID {id} not found or could not be deleted");
        }
    }
}
