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
    }
}
