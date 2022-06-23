import api from "../config/api";
const token = localStorage.getItem("access_token");

const CurrenciesServices = {
  getCurrency: async () => {
    const response = await api.get(`/currencies`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};

export default CurrenciesServices;
