// function Transfer(){
//     return <>
//     <div>Welcome to Transfer page</div>
//     </>
// }

// export default Transfer;

import React, { useState } from "react";
import { transferProduct } from "../services/api";
import "../style/products.css"; // Same styling as Warehouse page

function Transfers() {
  const [form, setForm] = useState({
    fromWarehouse: "",
    toWarehouse: "",
    productId: "",
    quantity: "",
  });

  const [message, setMessage] = useState("");
  const [mode, setMode] = useState("form"); // Keeps structure similar to Warehouses

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    setMessage("Processing transfer...");

    try {
      const response = await transferProduct(form);
      setMessage(response.message || "Transfer successful!");
      setForm({
        fromWarehouse: "",
        toWarehouse: "",
        productId: "",
        quantity: "",
      });
    } catch (error) {
      setMessage(error.message || "Transfer failed. Try again.");
    }

    setTimeout(() => setMessage(""), 1500);
  };

  return (
    <div className="products-container">
      <div className="crud-panel">
        <button
          className="crud-action-btn"
          onClick={() => setMode("form")}
        >
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
                  type="text"
                  name="fromWarehouse"
                  value={form.fromWarehouse}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>To Warehouse:</label>
                <input
                  type="text"
                  name="toWarehouse"
                  value={form.toWarehouse}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Product ID:</label>
                <input
                  type="number"
                  name="productId"
                  value={form.productId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Quantity:</label>
                <input
                  type="number"
                  name="quantity"
                  value={form.quantity}
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
                      fromWarehouse: "",
                      toWarehouse: "",
                      productId: "",
                      quantity: "",
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

