import db from '../models/index';
require('dotenv').config();
import emailService from './emailServices';
import { v4 as uuidv4 } from 'uuid';

let buildUrlEmail = (doctorId, token) => {
	let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`;
	return result;
};
let postBookAppointmentServices = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const requiredFields = ['email', 'doctorId', 'timeType', 'date', 'fullName'];
			const missingField = requiredFields.find((field) => !data[field]);
			if (missingField) {
				resolve({
					errCode: 1,
					errMessage: 'Missing parameter',
				});
			} else {
				let token = uuidv4();

				await emailService.sendSimpleEmail({
					receiverEmail: data.email,
					patientName: data.fullName,
					time: data.timeString,
					doctorName: data.doctorName,
					language: data.language,
					redirectLink: buildUrlEmail(data.doctorId, token),
				});

				let user = await db.User.findOrCreate({
					where: { email: data.email },
					defaults: {
						email: data.email,
						roleId: 'R3',
					},
				});

				if (user && user[0]) {
					await db.Booking.findOrCreate({
						where: {
							patientId: user[0].id,
						},
						defaults: {
							statusId: 'S1',
							doctorId: data.doctorId,
							patientId: user[0].id,
							date: data.date,
							timeType: data.timeType,
							token: token,
						},
					});
				}
				resolve({
					errCode: 0,
					errMessage: 'Save info patient successfully',
				});
			}
		} catch (e) {
			reject(e);
		}
	});
};
let postVerifyBookAppointmentServices = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			if (!data.token || !data.doctorId) {
				resolve({
					errCode: 1,
					errMessage: 'Missing parameter',
				});
			} else {
				let appointment = await db.Booking.findOne({
					where: {
						doctorId: data.doctorId,
						token: data.token,
						statusId: 'S1',
					},
					raw: false, // return sequelize object
				});

				if (appointment) {
					await appointment.update({
						statusId: 'S2',
					});
					resolve({
						errCode: 0,
						errMessage: 'Update the appointment succeed!',
					});
				} else {
					resolve({
						errCode: 2,
						errMessage: "Appointment has been activated or doesn't exist!",
					});
				}
			}
		} catch (e) {
			reject(e);
		}
	});
};

module.exports = {
	postBookAppointmentServices: postBookAppointmentServices,
	postVerifyBookAppointmentServices: postVerifyBookAppointmentServices,
};
