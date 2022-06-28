import api from "../config/api";
const token = localStorage.getItem("access_token");

const DealsPostServices = {
  getDealAction: async () => {
    const response = await api.get(`/deal-post-operation/actions`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};

export default DealsPostServices;
