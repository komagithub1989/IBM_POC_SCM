// function Transfer(){
//     return <>
//     <div>Welcome to Transfer page</div>
//     </>
// }

// export default Transfer;

import React, { useState } from "react";
import { transferProduct } from "../services/api";
import "../style/products.css";
 
function Transfers(props) {
  const [form, setForm] = useState({
    FromWarehouse: "",
    ToWarehouse: "",
    ProductId: "",
    Quantity: "",
  });
 
  const [message, setMessage] = useState("");
  const [mode, setMode] = useState("form");
 
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
 
  const handleTransfer = async (e) => {
    e.preventDefault();
    setMessage("Processing transfer...");
 
    // Convert string inputs to numbers before sending to API
    const payload = {
      FromWarehouse: parseInt(form.FromWarehouse),
      ToWarehouse: parseInt(form.ToWarehouse),
      ProductId: parseInt(form.ProductId),
      Quantity: parseInt(form.Quantity),
    };
 
    // Validate numbers
    if (
      isNaN(payload.FromWarehouse) ||
      isNaN(payload.ToWarehouse) ||
      isNaN(payload.ProductId) ||
      isNaN(payload.Quantity)
    ) {
      setMessage("Please enter valid numbers for all fields.");
      return;
    }
 
    try {
      const response = await transferProduct(payload);
      setMessage(response.message || "Transfer successful!");
      setForm({
        FromWarehouse: "",
        ToWarehouse: "",
        ProductId: "",
        Quantity: "",
      });
 
      if(props.onTransferSucess){
        props.onTransferSucess();
      }
    } catch (error) {
      // Show error from API if available
      setMessage(error.response?.data?.error || "Transfer failed. Try again.");
    }
 
    setTimeout(() => setMessage(""), 2500);
  };
 
  return (
    <div className="products-container">
      <div className="crud-panel">
        <button className="crud-action-btn" onClick={() => setMode("form")}>
          🔄 Transfer Products
        </button>
      </div>
 
      <div className="table-panel">
        {mode === "form" && (
          <>
            <h3>Transfer Products Between Warehouses</h3>
            <form onSubmit={handleTransfer} className="product-form">
              <div className="form-group">
                <label>From Warehouse:</label>
                <input
                  type="number"
                  name="FromWarehouse"
                  value={form.FromWarehouse}
                  onChange={handleChange}
                  required
                />
              </div>
 
              <div className="form-group">
                <label>To Warehouse:</label>
                <input
                  type="number"
                  name="ToWarehouse"
                  value={form.ToWarehouse}
                  onChange={handleChange}
                  required
                />
              </div>
 
              <div className="form-group">
                <label>Product ID:</label>
                <input
                  type="number"
                  name="ProductId"
                  value={form.ProductId}
                  onChange={handleChange}
                  required
                />
              </div>
 
              <div className="form-group">
                <label>Quantity:</label>
                <input
                  type="number"
                  name="Quantity"
                  value={form.Quantity}
                  onChange={handleChange}
                  required
                />
              </div>
 
              <div className="form-buttons">
                <button type="submit" className="crud-action-btn">
                  🚚 Transfer
                </button>
                <button
                  type="button"
                  className="crud-action-btn"
                  onClick={() =>
                    setForm({
                      FromWarehouse: "",
                      ToWarehouse: "",
                      ProductId: "",
                      Quantity: "",
                    })
                  }
                >
                  🔁 Reset
                </button>
              </div>
            </form>
 
            {message && <p className="message">{message}</p>}
          </>
        )}
      </div>
    </div>
  );
}
 
export default Transfers;