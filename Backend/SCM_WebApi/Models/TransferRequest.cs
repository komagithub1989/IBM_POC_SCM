using System;

namespace SCM_WebApi.Models
{
    public class TransferRequest
    {
         public int FromWarehouse { get; set; }
        public int ToWarehouse { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
