import { useEffect, useState } from "react";
import ProductTable from "../components/productstable";
import { getProducts } from "../services/api";

function Products(){
const [products, setProducts] = useState([]);

useEffect(() => {
    getProducts().then((res)=>{
        setProducts(res);
    }).catch((err) => console.error("Error loading inventory:", err));
},[]);

    return (
        <>
         <h3>Product List</h3>
        <ProductTable productList={products}/>
        </>
    );
}

export default Products;