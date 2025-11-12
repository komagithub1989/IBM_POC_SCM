import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getInventory = async () => {
  const response = await api.get("/Inventory/GetInventory_v2");
  return response.data;
};

export const getInventorySummary = async () => {
  const response = await api.get("/Inventory/Summery");
  return response.data;
};

export const getProducts = async () =>{
    const response = await api.get("/Product");
    return response.data;
}

export const addProduct = async (product) => {
    const response = await api.post("/Product", product);
    return response.data;
};

export const updateProduct = async (product) => {
    const response = await api.put(`/Product/${product.id}`, product);
    return response.data;
};

export const deleteProduct = async (id) => {
    const response = await api.delete(`/Product/${id}`);
    return response.data;
};


export const getWarehouses = async () =>{
    const response = await api.get("/Warehouse");
    return response.data;
}


export const addWarehouse = async (warehouse) => {
    const response = await api.post("/Warehouse", warehouse);
    return response.data;
};

export const updateWarehouse = async (warehouse) => {
    const response = await api.put(`/Warehouse?id=${warehouse.id}`,warehouse);
    return response.data;
};

export const deleteWarehouse = async (id) => {
    const response = await api.delete(`/Warehouse/${id}`);
    return response.data;
};


// --- Transfer API
export const transferProduct = async (transferData) => {
  const response = await api.post("/Transfer", transferData);
  return response.data;
};

export default api;

//add more api calls here