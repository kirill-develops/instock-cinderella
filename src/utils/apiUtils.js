import axios from "axios";

const BASE_URL = "http://localhost:8080";


const getAllWarehouseReq = {
  baseURL: BASE_URL,
  method: 'get',
  url: '/warehouses',
}

const getAllInventoryReq = {
  baseURL: BASE_URL,
  method: 'get',
  url: '/inventory',
}

const apiUtils = {
  getAllWarehouses: () => axios(getAllWarehouseReq),
  getWarehouseById: (warehouseId) => axios.get(`${BASE_URL}/warehouses/${warehouseId}`),
  addWarehouse: (title, description, yourWarehouseDetails) => axios.post(`${BASE_URL}/warehouses/`, {
    'title': title,
    'description': description,
    'yourWarehouseDetails': yourWarehouseDetails
  }),
  updateWarehouse: (warehouseId, warehouseObj) => axios.put(`${BASE_URL}/warehouses/${warehouseId}/`, {
    'warehouseObj': warehouseObj
  }),
  deleteWarehouse: (warehouseId) => axios.delete(`${BASE_URL}/warehouses/${warehouseId}/}`),
  getAllInventory: () => axios(getAllInventoryReq),
}


export default apiUtils;