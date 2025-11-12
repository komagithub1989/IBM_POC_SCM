import React from "react";

export default function SearchWarehouse({ searchTerm, setSearchTerm, onSubmit, message }) {
    return (
        <form className="panel-form" onSubmit={onSubmit}>
            {message && <div className="message">{message}</div>}
            <h3>Search Warehouse</h3>
            <div className="form-group">
                <label htmlFor="search-id">Warehouse Id:</label>
                <input
                    id="search-id"
                    type="text"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Enter Id"
                    required
                />
            </div>
            <button type="submit">Search</button>
        </form>
    );
}
