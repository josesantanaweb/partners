import api from "../config/api";

const token = localStorage.getItem("access_token");

const OperationsServices = {
  getCustomers: async () => {
    const response = await api.get(`${process.env.REACT_APP_API_URL}/customers`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  getCustomer: async (customerName) => {
    const response = await api.get(`${process.env.REACT_APP_API_URL}/customers?filter=${customerName}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};

export default OperationsServices;
