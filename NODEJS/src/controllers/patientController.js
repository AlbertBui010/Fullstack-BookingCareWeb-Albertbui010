import patientServices from '../services/patientServices';

let postBookAppointment = async (req, res) => {
	try {
		let response = await patientServices.postBookAppointmentServices(req.body);
		return res.status(200).json(response);
	} catch (e) {
		console.log(e);
		return res.status(200).json({
			errCode: -1,
			errMessage: 'Error from the server',
		});
	}
};

let postVerifyBookAppointment = async (req, res) => {
	try {
		let response = await patientServices.postVerifyBookAppointmentServices(req.body);
		return res.status(200).json(response);
	} catch (e) {
		console.log(e);
		return res.status(200).json({
			errCode: -1,
			errMessage: 'Error from the server',
		});
	}
};
module.exports = {
	postBookAppointment: postBookAppointment,
	postVerifyBookAppointment: postVerifyBookAppointment,
};
