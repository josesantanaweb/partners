import api from "../config/api";

const token = localStorage.getItem("access_token");

const CustomersServices = {
  getCustomers: async () => {
    const response = await api.get(`customers`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  getCustomer: async () => {
    const response = await api.get("customers", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  addCustomer: async (data) => {
    const response = await api.post("/customers", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  editCustomer: async (userId, data) => {
    const response = await api.patch(`/customers/${userId}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  deleteCustomer: async (id) => {
    const response = await api.delete(`/customers/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};

export default CustomersServices;
