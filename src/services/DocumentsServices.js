import api from "../config/api";
const token = localStorage.getItem("access_token");

const DocumentsServices = {
  getDocuments: async () => {
    const response = await api.get(`/documents`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  addDocument: async (document) => {
    const response = await api.post(`/documents`, document, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  deleteDocument: async (id) => {
    const response = await api.delete(`/documents/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  editDocument: async (documentId, data) => {
    const response = await api.patch(`/documents/${documentId}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  getPaginationDocuments: async (limit, page) => {
    const response = await api.get(`/documents?limit=${limit}&page=${page}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};

export default DocumentsServices;
