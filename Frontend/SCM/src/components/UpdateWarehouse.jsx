import React from "react";

export default function UpdateWarehouse({ values, setValues, onSubmit, onCancel, message }) {
    return (
        <form className="panel-form" onSubmit={onSubmit}>
            {message && <div className="message">{message}</div>}
            <h3>Update Warehouse</h3>
            <div className="form-group">
                <label htmlFor="update-id">Warehouse Id:</label>
                <input id="update-id" type="text" value={values.id} onChange={e => setValues({ ...values, id: e.target.value })} required />
            </div>
            <div className="form-group">
                <label htmlFor="update-name">Warehouse Name:</label>
                <input id="update-name" type="text" value={values.name} onChange={e => setValues({ ...values, name: e.target.value })} required />
            </div>
            <div className="form-group">
                <label htmlFor="update-location">Location:</label>
                <input id="update-location" type="text" value={values.location} onChange={e => setValues({ ...values, location: e.target.value })} required />
            </div>
            <div className="button-row">
                <button type="submit">Submit</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
}
