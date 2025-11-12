import React from "react";

export default function AddWarehouse({ values, setValues, onSubmit, onCancel, message }) {
    return (
        <form className="panel-form" onSubmit={onSubmit}>
            {message && <div className="message">{message}</div>}
            <h3>Add Warehouse</h3>
            <div className="form-group">
                <label htmlFor="add-id">Warehouse Id:</label>
                <input id="add-id" type="text" value={values.id} onChange={e => setValues({ ...values, id: e.target.value })} required />
            </div>
            <div className="form-group">
                <label htmlFor="add-name">Warehouse Name:</label>
                <input id="add-name" type="text" value={values.name} onChange={e => setValues({ ...values, name: e.target.value })} required />
            </div>
            <div className="form-group">
                <label htmlFor="add-location">Location:</label>
                <input id="add-location" type="text" value={values.location} onChange={e => setValues({ ...values, location: e.target.value })} required />
            </div>
            <div className="button-row">
                <button type="submit">Submit</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
}
