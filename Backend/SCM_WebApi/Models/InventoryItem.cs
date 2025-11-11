namespace SCM_WebApi.Models
{
    public class InventoryItem
    {
        public string? Id { get; set; }
        public int WarehouseId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
    
    public class ExtendedInventoryItem : InventoryItem
{    public Product? Product { get; set; }
    public Warehouse? Warehouse { get; set; }
}
}