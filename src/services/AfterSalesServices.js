import api from "../config/api";
const token = localStorage.getItem("access_token");

const DealsPostServices = {
  getPostDealOperations: async () => {
    const response = await api.get(`/deal-post-operation`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  addPostDealOperations: async (validPostDeal) => {
    const response = await api.post(`/deal-post-operation`, validPostDeal, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};

export default DealsPostServices;
