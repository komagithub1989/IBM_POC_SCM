namespace SCM_WebApi.Models
{
    public class InventoryItem
    {
        public string? Id { get; set;}
        public int WarehouseId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}