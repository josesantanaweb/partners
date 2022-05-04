import api from "../config/api";

const token = localStorage.getItem("access_token");

const CompanyServices = {
  getCompanies: async () => {
    const response = await api.get(`company`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  getCompany: async () => {
    const response = await api.get("company", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  addCompany: async (data) => {
    const response = await api.post("/company", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  editCompany: async (userId, data) => {
    const response = await api.patch(`/company/${userId}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  deleteCompany: async (id) => {
    const response = await api.delete(`/company/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};

export default CompanyServices;
