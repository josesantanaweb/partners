import api from "../config/api";

const token = localStorage.getItem("access_token");

const SegmentsServices = {
  getSegmentsNatural: async () => {
    const response = await api.get(`customer-segments?customerTypeId=1`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  getSegmentsLegal: async () => {
    const response = await api.get(`customer-segments?customerTypeId=2`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};

export default SegmentsServices;
