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
	console.log('Check data: ', data);
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
export { handleLoginApi, getAllUsers, createNewUserService, deleteUserByIdService, editUserService };
