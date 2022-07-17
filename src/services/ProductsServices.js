import api from "../config/api";

const token = localStorage.getItem("access_token");

const ProductsServices = {
  getProducts: async () => {
    const response = await api.get(`deal-product`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  getProduct: async () => {
    const response = await api.get("deal-product", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  addProduct: async (data) => {
    const response = await api.post("/deal-product", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  editProduct: async (userId, data) => {
    const response = await api.patch(`/deal-product/${userId}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  deleteProduct: async (id) => {
    const response = await api.delete(`/deal-product/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  getPaginationProducts: async (limit, page) => {
    const response = await api.get(`/deal-product?limit=${limit}&page=${page}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};

export default ProductsServices;
