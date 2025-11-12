import React from "react";

export default function DeleteProduct({ deleteId, setDeleteId, onSubmit, onCancel, message }) {
    return (
        <form className="panel-form" onSubmit={onSubmit}>
            {message && <div className="message">{message}</div>}
            <h3>Delete Product</h3>
            <div className="form-group">
                <label htmlFor="delete-id">Product Id:</label>
                <input id="delete-id" type="text" value={deleteId} onChange={e => setDeleteId(e.target.value)} required />
            </div>
            <div className="button-row">
                <button type="submit">Submit</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
}
