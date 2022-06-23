import api from "../config/api";
const token = localStorage.getItem("access_token");

const ValidDealsServices = {
  getValidDeals: async () => {
    const response = await api.get(`/deals`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};

export default ValidDealsServices;
