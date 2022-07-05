import api from "../config/api";
const token = localStorage.getItem("access_token");

const ValidDealsServices = {
  getValidDeals: async () => {
    const response = await api.get(`/deals`, {
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
  deletePostDeal: async (id) => {
    const response = await api.delete(`/deal-post-operation/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  editPostDeal: async (postDealId, data) => {
    const response = await api.patch(`/deal-post-operation/${postDealId}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  // pagination
  getPaginationValidDeals: async (itemPerPage, currentPage) => {
    const response = await api.get(`/deals?limit=${itemPerPage}&page=${currentPage}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};

export default ValidDealsServices;
