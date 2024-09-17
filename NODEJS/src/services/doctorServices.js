import db from '../models';
require('dotenv').config();
import _ from 'lodash';
// import moment from 'moment';

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

let getTopDoctorHomeServices = (limitInput) => {
	return new Promise(async (resolve, reject) => {
		try {
			let users = await db.User.findAll({
				limit: limitInput,
				where: { roleId: 'R2' },
				order: [['createdAt', 'DESC']],
				attributes: {
					exclude: ['password'],
				},
				include: [
					{ model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
					{ model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
				],
				raw: true,
				nest: true,
			});

			resolve({
				errCode: 0,
				data: users,
			});
		} catch (e) {
			reject(e);
		}
	});
};

let getAllDoctorsServices = () => {
	return new Promise(async (resolve, reject) => {
		try {
			let doctors = await db.User.findAll({
				where: { roleId: 'R2' },
				attributes: {
					exclude: ['password', 'image'],
				},
			});
			resolve({
				errCode: 0,
				data: doctors,
			});
		} catch (e) {
			reject(e);
		}
	});
};

let saveDetailInforDoctorServices = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const requiredFields = [
				'doctorId',
				'contentHTML',
				'contentMarkdown',
				'action',
				'selectedPrice',
				'selectedPayment',
				'selectedProvince',
				'nameClinic',
				'addressClinic',
				'note',
			];
			const missingField = requiredFields.find((field) => !data[field]);
			if (missingField) {
				resolve({
					errCode: 1,
					errMessage: 'Missing parameter',
				});
			} else {
				// UPSERT to Mardown
				if (data.action === 'CREATE') {
					await db.Markdown.create({
						contentHTML: data.contentHTML,
						contentMarkdown: data.contentMarkdown,
						description: data.description,
						doctorId: data.doctorId,
					});
				} else if (data.action === 'EDIT') {
					if (data.doctorId) {
						await db.Markdown.update(
							{
								contentHTML: data.contentHTML,
								contentMarkdown: data.contentMarkdown,
								description: data.description,
								// updatedAt: new Date(),
							},
							{ where: { doctorId: data.doctorId } },
						);
					}
				}

				// UPSERT to Doctor_Infor
				let doctorInfor = await db.Doctor_Infor.findOne({
					where: {
						doctorId: data.doctorId,
					},
					raw: false,
				});

				if (doctorInfor) {
					// Update
					await db.Doctor_Infor.update(
						{
							priceId: data.selectedPrice,
							paymentId: data.selectedPayment,
							provinceId: data.selectedProvince,
							nameClinic: data.nameClinic,
							addressClinic: data.addressClinic,
							note: data.note,
							// updatedAt: new Date(),
						},
						{ where: { doctorId: data.doctorId } },
					);
				} else {
					// Insert
					await db.Doctor_Infor.create({
						doctorId: data.doctorId,
						priceId: data.selectedPrice,
						paymentId: data.selectedPayment,
						provinceId: data.selectedProvince,
						nameClinic: data.nameClinic,
						addressClinic: data.addressClinic,
						note: data.note,
					});
				}

				resolve({
					errCode: 0,
					errMessage: 'Save information doctor successfully',
				});
			}
		} catch (e) {
			reject(e);
		}
	});
};

let getDetailDoctorByIdServices = (inputId) => {
	return new Promise(async (resolve, reject) => {
		try {
			if (!inputId) {
				resolve({
					errCode: 1,
					errMessage: 'Missing parameters',
				});
			} else {
				let data = await db.User.findOne({
					where: {
						id: inputId,
					},
					attributes: {
						exclude: ['password'],
					},
					include: [
						{ model: db.Markdown, attributes: ['description', 'contentHTML', 'contentMarkdown'] },
						{ model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
						{
							model: db.Doctor_Infor,
							attributes: {
								exclude: ['id', 'doctorId'],
							},
							include: [
								{ model: db.Allcode, as: 'priceTypeData', attributes: ['valueEn', 'valueVi'] },
								{ model: db.Allcode, as: 'provinceTypeData', attributes: ['valueEn', 'valueVi'] },
								{ model: db.Allcode, as: 'paymentTypeData', attributes: ['valueEn', 'valueVi'] },
							],
						},
					],
					raw: false,
					nest: true,
				});

				if (data && data.image) {
					data.image = new Buffer(data.image, 'base64').toString('binary');
				}
				if (!data) data = {};

				resolve({
					errCode: 0,
					data: data,
				});
			}
		} catch (e) {
			reject(e);
		}
	});
};

let bulkCreateScheduleServices = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			if (!data.arrSchedule || !data.doctorId || !data.dateFormatted) {
				resolve({
					errCode: 1,
					errMessage: 'Missing required parameters',
				});
			} else {
				let schedule = data.arrSchedule;
				if (schedule && schedule.length > 0) {
					schedule = schedule.map((item) => {
						item.maxNumber = MAX_NUMBER_SCHEDULE;
						return item;
					});
				}

				let existing = await db.Schedule.findAll({
					where: { doctorId: data.doctorId, date: data.dateFormatted },
					attributes: ['timeType', 'date', 'doctorId', 'maxNumber'],
					raw: true,
				});

				let toCreate = _.differenceWith(schedule, existing, (a, b) => {
					return a.timeType === b.timeType && +a.date === +b.date;
				});

				if (toCreate && toCreate.length > 0) {
					await db.Schedule.bulkCreate(toCreate);
					resolve({
						errCode: 0,
						errMessage: 'OK',
					});
				} else {
					resolve({
						errCode: 1,
						errMessage: 'Duplicate data',
					});
				}
			}
		} catch (e) {
			reject(e);
		}
	});
};

let getScheduleDoctorByDateServices = (doctorId, date) => {
	return new Promise(async (resolve, reject) => {
		try {
			if (!doctorId || !date) {
				resolve({
					errCode: 1,
					errMessage: 'Missing required parameter',
				});
			} else {
				let dataSchedule = await db.Schedule.findAll({
					where: {
						doctorId: doctorId,
						date: date,
					},
					include: [
						{ model: db.Allcode, as: 'timeTypeData', attributes: ['valueEn', 'valueVi'] },
						{ model: db.User, as: 'doctorData', attributes: ['firstName', 'lastName'] },
					],
					raw: false,
					nest: true,
				});

				if (!dataSchedule) dataSchedule = [];
				resolve({
					errCode: 0,
					data: dataSchedule,
				});
			}
		} catch (e) {
			reject(e);
		}
	});
};

let getExtraInforDoctorByIdServices = (doctorId) => {
	return new Promise(async (resolve, reject) => {
		try {
			if (!doctorId) {
				resolve({
					errCode: 1,
					errMessage: 'Missing required parameter',
				});
			} else {
				let data = await db.Doctor_Infor.findOne({
					where: {
						doctorId: doctorId,
					},
					attributes: {
						exclude: ['id', 'doctorId'],
					},
					include: [
						{ model: db.Allcode, as: 'priceTypeData', attributes: ['valueEn', 'valueVi'] },
						{ model: db.Allcode, as: 'provinceTypeData', attributes: ['valueEn', 'valueVi'] },
						{ model: db.Allcode, as: 'paymentTypeData', attributes: ['valueEn', 'valueVi'] },
					],
					raw: false,
					nest: true,
				});
				if (!data) data = {};

				resolve({
					errCode: 0,
					data: data,
				});
			}
		} catch (e) {
			reject(e);
		}
	});
};

let getProfileDoctorByIdServices = (doctorId) => {
	return new Promise(async (resolve, reject) => {
		if (!doctorId) {
			resolve({
				errCode: 1,
				errMessage: 'Missing parameters',
			});
		} else {
			let data = await db.User.findOne({
				where: {
					id: doctorId,
				},
				attributes: {
					exclude: ['password'],
				},
				include: [
					{ model: db.Markdown, attributes: ['description', 'contentHTML', 'contentMarkdown'] },
					{ model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
					{
						model: db.Doctor_Infor,
						attributes: {
							exclude: ['id', 'doctorId'],
						},
						include: [
							{ model: db.Allcode, as: 'priceTypeData', attributes: ['valueEn', 'valueVi'] },
							{ model: db.Allcode, as: 'provinceTypeData', attributes: ['valueEn', 'valueVi'] },
							{ model: db.Allcode, as: 'paymentTypeData', attributes: ['valueEn', 'valueVi'] },
						],
					},
				],
				raw: false,
				nest: true,
			});

			if (data && data.image) {
				data.image = new Buffer(data.image, 'base64').toString('binary');
			}
			if (!data) data = {};

			resolve({
				errCode: 0,
				data: data,
			});
		}
	});
};

module.exports = {
	getTopDoctorHomeServices: getTopDoctorHomeServices,
	getAllDoctorsServices: getAllDoctorsServices,
	saveDetailInforDoctorServices: saveDetailInforDoctorServices,
	getDetailDoctorByIdServices: getDetailDoctorByIdServices,
	bulkCreateScheduleServices: bulkCreateScheduleServices,
	getScheduleDoctorByDateServices: getScheduleDoctorByDateServices,
	getExtraInforDoctorByIdServices: getExtraInforDoctorByIdServices,
	getProfileDoctorByIdServices: getProfileDoctorByIdServices,
};
