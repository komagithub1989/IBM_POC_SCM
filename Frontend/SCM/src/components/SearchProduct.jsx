import React from "react";

export default function SearchProduct({ searchTerm, setSearchTerm, onSubmit }) {
    return (
        <form className="panel-form" onSubmit={onSubmit}>
            <h3>Search Product</h3>
            <div className="form-group">
                <label htmlFor="search-id">Product Id:</label>
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
