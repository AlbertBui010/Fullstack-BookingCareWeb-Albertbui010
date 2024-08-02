import { UUID, where } from 'sequelize';
import db from '../models';

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
			console.log('Albert check data from servicees: ', data);
			if (!data.doctorId || !data.contentHTML || !data.contentMarkdown) {
				resolve({
					errCode: 1,
					errMessage: 'Missing parameter',
				});
			} else {
				await db.Markdown.create({
					contentHTML: data.contentHTML,
					contentMarkdown: data.contentMarkdown,
					description: data.description,
					doctorId: data.doctorId,
				});

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
						exclude: ['password', 'image'],
					},
					include: [
						{ model: db.Markdown, attributes: ['description', 'contentHTML', 'contentMarkdown'] },
						{ model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
					],
					raw: true,
					nest: true,
				});
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

module.exports = {
	getTopDoctorHomeServices: getTopDoctorHomeServices,
	getAllDoctorsServices: getAllDoctorsServices,
	saveDetailInforDoctorServices: saveDetailInforDoctorServices,
	getDetailDoctorByIdServices: getDetailDoctorByIdServices,
};
