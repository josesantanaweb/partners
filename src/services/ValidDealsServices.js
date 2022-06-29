import api from "../config/api";
const token = localStorage.getItem("access_token");

const ValidDealsServices = {
  getValidDeals: async () => {
    const response = await api.get(`/deals`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  // pagination
  getValidDealsPags: async (itemPerPage, currentPage) => {
    const response = await api.get(`/deal-post-operation?limit=${itemPerPage}&page=${currentPage}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};

export default ValidDealsServices;
