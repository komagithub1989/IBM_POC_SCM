import React from "react";

function InventoryTable({ inventory }) {
    if (!inventory || inventory.length === 0) {
    return <p>No inventory data available.</p>;
  }

  console.log(inventory);
  return (
    <>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            {/* <th>Warehouse ID</th> */}
            <th>Warehouse Name</th>
            {/* <th>Product ID</th> */}
            <th>Product Name</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item, index) => (
            <tr key={index}>
              {/* <td>{item.warehouseId}</td> */}
              {/* <td>{item.productId}</td> */}
              <td>{item.warehouse.name}</td>
              <td>{item.product.name}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default InventoryTable;
