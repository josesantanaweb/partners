import api from "../config/api";

const token = localStorage.getItem("access_token");

const CountriesServices = {
  getCountries: async () => {
    const response = await api.get(`countries`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  getCities: async (countryId) => {
    const response = await api.get(`states?countryId=${countryId}&limit=100`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};

export default CountriesServices;
