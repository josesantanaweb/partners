import api from "../config/api";

const token = localStorage.getItem("access_token");

const DocumentsServices = {
  getDocuments: async () => {
    const response = await api.get(`documents`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};

export default DocumentsServices;
