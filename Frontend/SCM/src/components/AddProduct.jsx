import React from "react";

export default function AddProduct({ values, setValues, onSubmit, onCancel, message }) {
  return (
      <form className="panel-form" onSubmit={onSubmit}>
       {message && <div className="message">{message}</div>}
      <h3>Add Product</h3>
      <div className="form-group">
        <label htmlFor="add-id">Product Id:</label>
        <input id="add-id" type="text" value={values.id} onChange={e => setValues({ ...values, id: e.target.value })} required />
      </div>
      <div className="form-group">
        <label htmlFor="add-name">Product Name:</label>
        <input id="add-name" type="text" value={values.name} onChange={e => setValues({ ...values, name: e.target.value })} required />
      </div>
      <div className="form-group">
        <label htmlFor="add-price">Product Price:</label>
        <input id="add-price" type="number" value={values.price} onChange={e => setValues({ ...values, price: e.target.value })} required />
      </div>
          <div className="button-row">
              <button type="submit">Submit</button>
              <button type="button" onClick={onCancel}>Cancel</button>
          </div>
    </form>
  );
}
