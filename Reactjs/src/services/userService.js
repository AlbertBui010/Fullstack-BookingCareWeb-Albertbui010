import axios from '../axios';

const handleLoginApi = (data) => {
	return axios.post('/api/login', data);
};

const getAllUsers = (idInput) => {
	//template string
	return axios.get(`/api/get-all-users?id=${idInput}`);
};

const createNewUserService = (data) => {
	console.log('Check data: ', data);
	return axios.post('/api/create-new-user', data);
};

export { handleLoginApi, getAllUsers, createNewUserService };
