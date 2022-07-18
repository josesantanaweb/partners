import api from "../config/api";

const token = localStorage.getItem("access_token");

const CompanyServices = {
  getCompanies: async (filter) => {
    const response = await api.get(`companies?filter=${filter || ""}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  getCompany: async () => {
    const response = await api.get("companies", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  addCompany: async (data) => {
    const response = await api.post("/companies", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  editCompany: async (userId, data) => {
    const response = await api.patch(`/companies/${userId}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  deleteCompany: async (id) => {
    const response = await api.delete(`/companies/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  getPaginationCompanies: async (limit, page) => {
    const response = await api.get(`/companies?limit=${limit}&page=${page}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};

export default CompanyServices;
