import axios from '../axios';

const handleLoginApi = (data) => {
	return axios.post('/api/login', data);
};

const getAllUsers = (idInput) => {
	//template string
	return axios.get(`/api/get-all-users?id=${idInput}`);
};

export { handleLoginApi, getAllUsers };
