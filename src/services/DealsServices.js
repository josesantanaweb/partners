import api from "../config/api";
const token = localStorage.getItem("access_token");

const DealsServices = {
  getDeal: async () => {
    const response = await api.get(`/deals`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  addDeal: async (document) => {
    const response = await api.post(`/deals`, document, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  deleteDeal: async (id) => {
    const response = await api.delete(`/deals/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  editDeal: async (documentId, data) => {
    const response = await api.patch(`/deals/${documentId}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  // Selects Form
  getDealSelects: async () => {
    const response = await api.get(`/deals/selects`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  getDealsTypeForms: async(type, idPlan) => {
    console.log("Pasando:! ",type,idPlan)
    const response = await api.get(`/deal-product/${idPlan}?customerTypeId=${type}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  getCustomerLibraryId: async(id) => {
    console.log("Customer libray iD:", id)
    const response  = await api.get(`/customer-library/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
};

export default DealsServices;
