import api from "../config/api";

const token = localStorage.getItem("access_token");

const RolesServices = {
  getRoles: async () => {
    const response = await api.get(`advisor-rol`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  getRole: async () => {
    const response = await api.get("advisor-rol", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  addRole: async (data) => {
    const response = await api.post("/advisor-rol", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  editRole: async (userId, data) => {
    const response = await api.patch(`/advisor-rol/${userId}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  deleteRole: async (id) => {
    const response = await api.delete(`/advisor-rol/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};

export default RolesServices;
