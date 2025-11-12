// import { useEffect, useState } from "react";
// import ProductTable from "../components/productstable";
// import { getProducts } from "../services/api";

// function Products(){
// const [products, setProducts] = useState([]);

// useEffect(() => {
//     getProducts().then((res)=>{
//         setProducts(res);
//     }).catch((err) => console.error("Error loading inventory:", err));
// },[]);

//     return (
//         <>
//          <h3>Product List</h3>
//         <ProductTable productList={products}/>
//         </>
//     );
// }

// export default Products;

import React, { useEffect, useState } from "react";
import ProductTable from "../components/productstable";
import AddProduct from "../components/AddProduct";
import UpdateProduct from "../components/UpdateProduct";
import DeleteProduct from "../components/DeleteProduct";
import SearchProduct from "../components/SearchProduct";
import { getProducts, addProduct, updateProduct, deleteProduct } from "../services/api";
import '../style/products.css';

function Products() {
    const [products, setProducts] = useState([]);
    const [mode, setMode] = useState("table"); // 'table', 'add', 'update', 'delete', 'search', 'searchResult'
    const [addForm, setAddForm] = useState({ id: "", name: "", price: "" });
    const [updateForm, setUpdateForm] = useState({ id: "", name: "", price: "" });
    const [deleteId, setDeleteId] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        loadProducts();
    }, []);

    function loadProducts() {
        getProducts().then(setProducts).catch(console.error);
    }

    const handleAdd = (e) => {
        e.preventDefault();

        const existingProduct = products.find(p => p.id === addForm.id || (+p.id === +addForm.id));
        if (existingProduct) {
            setAddForm({ id: "", name: "", price: "" });
            setMessage("Product ID already exists. Please use a unique ID.");
            setTimeout(() => {
                setMessage(""); // Optional: clear the message after navigation
            }, 1500);
            return; 
        }
        addProduct(addForm)
            .then(() => {
                setAddForm({ id: "", name: "", price: "" });
                setMessage("Product added successfully!");
                loadProducts();
                setTimeout(() => {
                    setMode("table");
                    setMessage(""); // Optional: clear the message after navigation
                }, 1500);
            })
            .catch(() => {
                setMessage("Failed to add product.")
            });
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        const existingProduct = products.find(p => p.id === updateForm.id || +p.id === +updateForm.id);
        if (!existingProduct) {
            setUpdateForm({ id: "", name: "", price: "" });
            setMessage("Product does not exist. Cannot update non-existent product.");
            setTimeout(() => {
                setMessage(""); // Optional: clear the message after navigation
            }, 1500);
            return; // stop further execution
        }
        updateProduct(updateForm)
            .then(() => {
                setMessage("Product updated successfully!");
                setUpdateForm({ id: "", name: "", price: "" });
                loadProducts();
                setTimeout(() => {
                    setMode("table");
                    setMessage(""); // Optional: clear the message after navigation
                }, 1500);
            })
            .catch(() => {
                setMessage("Failed to update product.")
            });
    };

    const handleDelete = (e) => {
        e.preventDefault();
        const existingProduct = products.find(p => p.id === parseInt(deleteId, 0) || +p.id === +deleteId.id);
        if (!existingProduct) {
            setDeleteId("");
            setMessage("Product does not exist. Cannot delete non-existent product.");
            setTimeout(() => {
                setMessage(""); // Optional: clear the message after navigation
            }, 1500);
            return; // stop further execution
        }
        deleteProduct(deleteId)
            .then(() => {
                setMessage("Product deleted successfully!");
                setDeleteId("");
                loadProducts();
                setTimeout(() => {
                    setMode("table");
                    setMessage(""); // Optional: clear the message after navigation
                }, 1500);
            })
            .catch(() => {
                setMessage("Failed to delete product.")
            });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const filtered = products.filter(
            p => ("" + p.id).trim() === searchTerm.trim()
        );
        setSearchResult(filtered);
        setMessage(filtered.length ? "Product(s) found!" : "No product found with that ID.");
        setMode("searchResult");
        setTimeout(() => {
            setMessage(""); // Optional: clear the message after navigation
        }, 1500);
    };



    return (
        <div className="products-container">
            <div className="crud-panel">
                <button className="crud-action-btn" onClick={() => setMode("add")}>
                    ➕ Add Product
                </button>
                <button className="crud-action-btn" onClick={() => setMode("update")}>
                    ✏️ Update Product
                </button>
                <button className="crud-action-btn" onClick={() => setMode("delete")}>
                    🗑️ Delete Product
                </button>
                <button className="crud-action-btn" onClick={() => setMode("search")}>
                    🔍 Search Product
                </button>
            </div>
            <div className="table-panel">
                {mode === "table" && (
                    <>
                        <h3>Products Table</h3>
                        <ProductTable productList={products} />
                    </>
                )}
                {mode === "add" && (
                <AddProduct
                        message = {message}
                        values={addForm}
                        setValues={setAddForm}
                        onSubmit={handleAdd}
                        onCancel={() => setMode("table")}
                    />
                )}
                {mode === "update" && (
                <UpdateProduct
                        message={message}
                        values={updateForm}
                        setValues={setUpdateForm}
                        onSubmit={handleUpdate}
                        onCancel={() => setMode("table")}
                    />
                )}
                {mode === "delete" && (
                <DeleteProduct
                        message={message}
                        deleteId={deleteId}
                        setDeleteId={setDeleteId}
                        onSubmit={handleDelete}
                        onCancel={() => setMode("table")}
                    />
                )}
                {mode === "search" && (
                    <SearchProduct
                        message={message}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        onSubmit={handleSearch}
                    />
                )}
                {mode === "searchResult" && (
                    <>
                        <h3>Search Results</h3>
                        <ProductTable productList={searchResult} />
                        <button type="button" style={{ marginTop: "15px" }} onClick={() => setMode("table")}>
                            Back to All
                        </button>
                    </>
                )}
            </div>

        </div>
    );
}

export default Products;
