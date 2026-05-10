import axios from "axios";

const getBaseUrl = () => {
   const baseUrl =
      process.env.REACT_APP_BASE_URL ||
      process.env.REACT_APP_BASE_URL_DEV ||
      process.env.REACT_APP_BASE_URL_PROD ||
      "http://localhost:8080";

   return baseUrl.trim().replace(/\/+$/, "");
};

const apiClient = axios.create({
   baseURL: getBaseUrl(),
});

const apiUtils = {
   getAllWarehouses: () => apiClient.get("/warehouses"),
   getWarehouseById: (warehouseId) =>
      apiClient.get(`/warehouses/${warehouseId}`),
   addWarehouse: (warehouseObj) => apiClient.post("/warehouses", warehouseObj),
   updateWarehouse: (warehouseId, warehouseObj) =>
      apiClient.put(`/warehouses/${warehouseId}`, warehouseObj),
   deleteWarehouse: (warehouseId) =>
      apiClient.delete(`/warehouses/${warehouseId}`),

   getAllInventory: () => apiClient.get("/inventory"),
   getInventoryById: (itemId) => apiClient.get(`/inventory/${itemId}`),
   addInventory: (itemObj) => apiClient.post("/inventory", itemObj),
   updateInventory: (itemId, itemObj) =>
      apiClient.put(`/inventory/${itemId}`, itemObj),
   deleteInventory: (itemId) => apiClient.delete(`/inventory/${itemId}`),
};

export default apiUtils;
