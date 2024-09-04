import { where } from 'sequelize';
import db from '../models/index';
require('dotenv').config();

let postBookAppointmentServices = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const requiredFields = ['email', 'doctorId', 'timeType', 'date'];
			const missingField = requiredFields.find((field) => !data[field]);
			if (missingField) {
				resolve({
					errCode: 1,
					errMessage: 'Missing parameter',
				});
			} else {
				//update
				//insert
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

module.exports = {
	postBookAppointmentServices: postBookAppointmentServices,
};
