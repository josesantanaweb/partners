import api from "../config/api";

const token = localStorage.getItem("access_token");

const MenuServices = {
  getMenu: async () => {
    const response = await api.get(`/me/menu-items`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  getMenuItems: async () => {
    const response = await api.get(`/menu-items`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};

export default MenuServices;
