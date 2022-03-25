import api from '../config/api';

const token = localStorage.getItem("access_token");

const UsersServices = {
	getUsers: async () => {
		const response = await api.get(`users`, {
			headers: {Authorization:  `Bearer ${token}`}
		});
		return response.data;
	},
	getUser: async () => {
		const response = await api.get('users', {
			headers: {Authorization:  `Bearer ${token}`}
		});
		return response.data;
	},
	addUser: async (data) => {
		const response = await api.post('/users', data, {
			headers: {Authorization:  `Bearer ${token}`}
		});
		return response.data;
	},
	editUser: async ({ userId, ...data }) => {
		const response = await api.patch(`/users/${userId}`, data, {
			headers: {Authorization:  `Bearer ${token}`}
		});
		return response.data;
	},
	deleteUser: async (id) => {
		const response = await api.delete(`/users/${id}`, {
			headers: {Authorization:  `Bearer ${token}`}
		});
		return response.data;
	},
};

export default UsersServices;
