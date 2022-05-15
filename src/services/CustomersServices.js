import api from "../config/api";

const token = localStorage.getItem("access_token");

const CustomersServices = {
  getCustomerNatural: async () => {
    const response = await api.get(`customers/natural`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  getCustomerLegal: async () => {
    const response = await api.get(`customers/legal`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  addCustomerNatural: async (data) => {
    const response = await api.post("/customers/natural", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  addCustomerLegal: async (data) => {
    const response = await api.post("/customers/legal", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  editCustomerNatural: async (userId, data) => {
    const response = await api.patch(`/customers/natural/${userId}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  editCustomerLegal: async (userId, data) => {
    const response = await api.patch(`/customers/legal/${userId}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  deleteCustomerNatural: async (id) => {
    const response = await api.delete(`/customers/natural/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  deleteCustomerLegal: async (id) => {
    const response = await api.delete(`/customers/legal/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};

export default CustomersServices;
