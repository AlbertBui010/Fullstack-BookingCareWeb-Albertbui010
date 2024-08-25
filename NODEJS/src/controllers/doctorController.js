import doctorServices from '../services/doctorServices';

let getTopDoctorHome = async (req, res) => {
	let limit = req.query.limit;
	if (!limit) limit = 10;
	try {
		let doctorsRes = await doctorServices.getTopDoctorHomeServices(+limit);
		return res.status(200).json(doctorsRes);
	} catch (e) {
		console.log(e);
		return res.status(200).json({
			errCode: -1,
			message: 'Error from server...',
		});
	}
};

let getAllDoctors = async (req, res) => {
	try {
		let doctors = await doctorServices.getAllDoctorsServices();
		return res.status(200).json(doctors);
	} catch (e) {
		return res.status(200).json({
			errCode: -1,
			errMessage: 'Error from the server',
		});
	}
};

let postInforDoctor = async (req, res) => {
	try {
		let response = await doctorServices.saveDetailInforDoctorServices(req.body);
		return res.status(200).json(response);
	} catch (e) {
		console.log(e);
		return res.status(200).json({
			errCode: -1,
			errMessage: 'Error from the server',
		});
	}
};

let getDetailDoctorById = async (req, res) => {
	try {
		let infor = await doctorServices.getDetailDoctorByIdServices(req.query.id);
		return res.status(200).json(infor);
	} catch (e) {
		console.log(e);
		return res.status(200).json({
			errCode: -1,
			errMessage: 'Error from server',
		});
	}
};

let bulkCreateSchedule = async (req, res) => {
	try {
		let infor = await doctorServices.bulkCreateScheduleServices(req.body);
		return res.status(200).json(infor);
	} catch (e) {
		console.log(e);
		return res.status(200).json({
			errCode: -1,
			errMessage: 'Error from server',
		});
	}
};

let getScheduleDoctorByDate = async (req, res) => {
	try {
		let response = await doctorServices.getScheduleDoctorByDateServices(req.query.doctorId, req.query.date);
		return res.status(200).json(response);
	} catch (e) {
		console.log(e);
		return res.status(200).json({
			errCode: -1,
			errMessage: 'Error from server',
		});
	}
};

let getExtraInforDoctorById = async (req, res) => {
	try {
		let response = await doctorServices.getExtraInforDoctorByIdServices(req.query.doctorId);
		return res.status(200).json(response);
	} catch (e) {
		console.log(e);
		return res.status(200).json({
			errCode: -1,
			errMessage: 'Error from server',
		});
	}
};

module.exports = {
	getTopDoctorHome: getTopDoctorHome,
	getAllDoctors: getAllDoctors,
	postInforDoctor: postInforDoctor,
	getDetailDoctorById: getDetailDoctorById,
	bulkCreateSchedule: bulkCreateSchedule,
	getScheduleDoctorByDate: getScheduleDoctorByDate,
	getExtraInforDoctorById: getExtraInforDoctorById,
};
