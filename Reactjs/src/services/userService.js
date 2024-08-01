import axios from '../axios';

const handleLoginApi = (data) => {
	return axios.post('/api/login', data);
};

const getAllUsers = (idInput) => {
	//template string
	return axios.get('/api/get-all-users', {
		params: {
			id: idInput,
		},
	});
};

const createNewUserService = (data) => {
	return axios.post('/api/create-new-user', data);
};

const deleteUserByIdService = (userId) => {
	return axios.delete('/api/delete-user', {
		data: {
			id: userId,
		},
	});
};

const editUserService = (inputData) => {
	return axios.put('/api/edit-user', inputData);
};

const getAllCodeService = (inputType) => {
	return axios.get(`/api/allcode?type=${inputType}`);
};

const getTopDoctorHomeServices = (limit) => {
	return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

export {
	handleLoginApi,
	getAllUsers,
	createNewUserService,
	deleteUserByIdService,
	editUserService,
	getAllCodeService,
	getTopDoctorHomeServices,
};
