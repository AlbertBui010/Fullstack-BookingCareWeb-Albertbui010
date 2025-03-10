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

const getAllDoctors = () => {
	return axios.get(`/api/get-all-doctors`);
};

const saveDetailInforDoctorServices = (data) => {
	return axios.post(`/api/save-infor-doctors`, data);
};

const getDetailInforDoctor = (id) => {
	return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
};

const saveBulkScheduleDoctor = (data) => {
	return axios.post('/api/bulk-create-schedule', data);
};

const getScheduleDoctorByDate = (doctorId, date) => {
	return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
};

const getExtraInforDoctorById = (doctorId) => {
	return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
};
const getProfileDoctorById = (doctorId) => {
	return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};
const postPatientBookAppointment = (data) => {
	return axios.post('/api/patient-book-appointment', data);
};
const postVerifyEmailBooking = (data) => {
	return axios.post('/api/verify-book-appointment', data);
};

export {
	handleLoginApi,
	getAllUsers,
	createNewUserService,
	deleteUserByIdService,
	editUserService,
	getAllCodeService,
	getTopDoctorHomeServices,
	getAllDoctors,
	saveDetailInforDoctorServices,
	getDetailInforDoctor,
	saveBulkScheduleDoctor,
	getScheduleDoctorByDate,
	getExtraInforDoctorById,
	getProfileDoctorById,
	postPatientBookAppointment,
	postVerifyEmailBooking,
};
