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

export const getProducts = async () =>{
    const response = await api.get("/Product");
    return response.data;
}

export const getWarehouse = async () =>{
    const response = await api.get("/Warehouse");
    return response.data;
}

export default api;

//add more api calls here