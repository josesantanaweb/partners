import api from "../config/api";

const token = localStorage.getItem("access_token");

const AdvisersServices = {
  getAdvisers: async () => {
    const response = await api.get(`advisors`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  getAdviser: async () => {
    const response = await api.get("advisors", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  addAdviser: async (data) => {
    const response = await api.post("/advisors", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  editAdviser: async (userId, data) => {
    const response = await api.patch(`/advisors/${userId}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  deleteAdviser: async (id) => {
    const response = await api.delete(`/advisors/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};

export default AdvisersServices;
