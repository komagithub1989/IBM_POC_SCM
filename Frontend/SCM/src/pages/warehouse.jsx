// import { useEffect, useState } from "react";
// import WareHouseTable from "../components/warehousetable";
// import { getWarehouse } from "../services/api";

// function WareHouse(){
// const [warehouse, setWareHouse] = useState([]);

// useEffect(()=>{
//   getWarehouse().then((result) =>{
//     setWareHouse(result);
//   }).catch((error)=>{ console.log("Error loading inventory:", error); });
// },[]);

//   return(
//     <>
//     <h3>Warehouse list</h3>
//     <WareHouseTable warehouseList = {warehouse}></WareHouseTable>
//     </>
//   );
// }

// export default WareHouse;

import React, { useEffect, useState } from "react";
import WarehouseTable from "../components/warehousetable";
import AddWarehouse from "../components/AddWarehouse";
import UpdateWarehouse from "../components/UpdateWarehouse";
import DeleteWarehouse from "../components/DeleteWarehouse";
import SearchWarehouse from "../components/SearchWarehouse";
import { getWarehouses, addWarehouse, updateWarehouse, deleteWarehouse } from "../services/api";
import '../style/products.css';

function Warehouses() {
    const [warehouses, setWarehouses] = useState([]);
    const [mode, setMode] = useState("table");
    const [addForm, setAddForm] = useState({ id: "", name: "", location: "" });
    const [updateForm, setUpdateForm] = useState({ id: "", name: "", location: "" });
    const [deleteId, setDeleteId] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        loadWarehouses();
    }, []);

    function loadWarehouses() {
        getWarehouses().then(setWarehouses).catch(console.error);
    }

    const handleAdd = (e) => {
        e.preventDefault();
        const existing = warehouses.find(w => w.id === addForm.id || (+w.id === +addForm.id));
        if (existing) {
            setAddForm({ id: "", name: "", location: "" });
            setMessage("Warehouse ID already exists. Please use a unique ID.");
            setTimeout(() => setMessage(""), 1500);
            return;
        }
        addWarehouse(addForm)
            .then(() => {
                setAddForm({ id: "", name: "", location: "" });
                setMessage("Warehouse added successfully!");
                loadWarehouses();
                setTimeout(() => {
                    setMode("table");
                    setMessage("");
                }, 1500);
            })
            .catch(() => setMessage("Failed to add warehouse."));
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const existing = warehouses.find(w => w.id === updateForm.id || +w.id === +updateForm.id);
        if (!existing) {
            setUpdateForm({ id: "", name: "", location: "" });
            setMessage("Warehouse does not exist. Cannot update.");
            setTimeout(() => setMessage(""), 1500);
            return;
        }
        updateWarehouse(updateForm)
            .then(() => {
                setMessage("Warehouse updated successfully!");
                setUpdateForm({ id: "", name: "", location: "" });
                loadWarehouses();
                setTimeout(() => {
                    setMode("table");
                    setMessage("");
                }, 1500);
            })
            .catch(() => setMessage("Failed to update warehouse."));
    };

    const handleDelete = (e) => {
        e.preventDefault();
        const existing = warehouses.find(w => w.id === deleteId || +w.id === +deleteId);
        if (!existing) {
            setDeleteId("");
            setMessage("Warehouse does not exist. Cannot delete.");
            setTimeout(() => setMessage(""), 1500);
            return;
        }
        deleteWarehouse(deleteId)
            .then(() => {
                setMessage("Warehouse deleted successfully!");
                setDeleteId("");
                loadWarehouses();
                setTimeout(() => {
                    setMode("table");
                    setMessage("");
                }, 1500);
            })
            .catch(() => setMessage("Failed to delete warehouse."));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const filtered = warehouses.filter(
            w => ("" + w.id).trim() === searchTerm.trim()
        );
        setSearchResult(filtered);
        setMessage(filtered.length ? "Warehouse(s) found!" : "No warehouse found with that ID.");
        setMode("searchResult");
        setTimeout(() => setMessage(""), 1500);
    };

    return (
        <div className="products-container">
            <div className="crud-panel">
                <button className="crud-action-btn" onClick={() => setMode("add")}>➕ Add Warehouse</button>
                <button className="crud-action-btn" onClick={() => setMode("update")}>✏️ Update Warehouse</button>
                <button className="crud-action-btn" onClick={() => setMode("delete")}>🗑️ Delete Warehouse</button>
                <button className="crud-action-btn" onClick={() => setMode("search")}>🔍 Search Warehouse</button>
            </div>
            <div className="table-panel">
                {mode === "table" && (
                    <>
                        <h3>Warehouses Table</h3>
                        <WarehouseTable warehouseList={warehouses} />
                    </>
                )}
                {mode === "add" && (
                    <AddWarehouse
                        message={message}
                        values={addForm}
                        setValues={setAddForm}
                        onSubmit={handleAdd}
                        onCancel={() => setMode("table")}
                    />
                )}
                {mode === "update" && (
                    <UpdateWarehouse
                        message={message}
                        values={updateForm}
                        setValues={setUpdateForm}
                        onSubmit={handleUpdate}
                        onCancel={() => setMode("table")}
                    />
                )}
                {mode === "delete" && (
                    <DeleteWarehouse
                        message={message}
                        deleteId={deleteId}
                        setDeleteId={setDeleteId}
                        onSubmit={handleDelete}
                        onCancel={() => setMode("table")}
                    />
                )}
                {mode === "search" && (
                    <SearchWarehouse
                        message={message}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        onSubmit={handleSearch}
                    />
                )}
                {mode === "searchResult" && (
                    <>
                        <h3>Search Results</h3>
                        <WarehouseTable warehouseList={searchResult} />
                        <button type="button" style={{ marginTop: "15px" }} onClick={() => setMode("table")}>
                            Back to All
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Warehouses;
