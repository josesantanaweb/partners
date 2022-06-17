import api from "../config/api";
const token = localStorage.getItem("access_token");

const ValidDealsServices = {
  getValidDeals: async () => {
    const response = await api.get(`/deals`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  addValidDeal: async (validDeal) => {
    const response = await api.post(`/deals`, validDeal, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  deleteValidDeal: async (id) => {
    const response = await api.delete(`/deals/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  editValidDeal: async (validDealId, data) => {
    const response = await api.patch(`/deals/${validDealId}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};

export default ValidDealsServices;
