import api from "../config/api";

const token = localStorage.getItem("access_token");

const OperationsServices = {
  getCustomers: async () => {
    const response = await api.get(`${process.env.REACT_APP_API_URL}/customers`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  getCustomer: async (customerName) => {
    const response = await api.get(`/customers?filter=${customerName}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  getDeals: async () => {
    const response = await api.get("/deals", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  addDeal: async (deal) => {
    const response = await api.post("/deals", deal, {
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
  editDeal: async (dealId, data) => {
    const response = await api.patch(`/deals/${dealId}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  // Deal Form Selects
  getDealSelects: async () => {
    const response = await api.get(`/deals/selects`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};

export default OperationsServices;
