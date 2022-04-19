import api from "../config/api";

const token = localStorage.getItem("access_token");

const OperationsServices = {
  getCustomers: async () => {
    const response = await api.get(`https://business-portal-dev.herokuapp.com/customers`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  getCustomer: async (customerName) => {
    const response = await api.get(`https://business-portal-dev.herokuapp.com/customers?filter=${customerName}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  addDeal: async (deal) => {
    const response = await api.post("/deals/", deal, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  deleteDeal: async (id) => {
    const response = await api.delete(`/deals/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  editDeal: async (userId, data) => {
    const response = await api.patch(`/deal/${userId}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};

export default OperationsServices;
