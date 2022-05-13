import api from "../config/api";

const token = localStorage.getItem("access_token");

const CustomersServices = {
  getCustomerNatural: async () => {
    const response = await api.get(`customers/natural`, {
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
  addCustomerNatural: async (data) => {
    const response = await api.post("/customers/natural", data, {
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
  deleteCustomer: async (id) => {
    const response = await api.delete(`/customers/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};

export default CustomersServices;
