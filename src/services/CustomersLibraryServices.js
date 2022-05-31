import api from "../config/api";
const token = localStorage.getItem("access_token");

const CustomersLibraryServices = {
  getCustomerLibrary: async (customerId) => {
    const response = await api.get(`customer-library/${customerId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  addCustomerLibDoc: async (customerId, document) => {
    const response = await api.post(`/customer-library`, document, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  // Documents
  getCustomerDocument: async (customerId) => {
    const response = await api.get(`customer-library/${customerId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};

export default CustomersLibraryServices;
