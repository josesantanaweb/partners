import api from "../config/api";

const token = localStorage.getItem("access_token");

const MettingServices = {
  getMettings: async () => {
    const response = await api.get(`meetings`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  getCategories: async () => {
    const response = await api.get(`meetings/categories`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  getMetting: async () => {
    const response = await api.get("meetings", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  addMetting: async (data) => {
    const response = await api.post("/meetings", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  editMetting: async (userId, data) => {
    const response = await api.patch(`/meetings/${userId}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  deleteMetting: async (id) => {
    const response = await api.delete(`/meetings/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};

export default MettingServices;
