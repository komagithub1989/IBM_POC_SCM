import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getInventory = async () => {
  const response = await api.get("/inventory");
  return response.data;
};

export default api;

//add more api calls here