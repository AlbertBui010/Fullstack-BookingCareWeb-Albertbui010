import { raw } from 'body-parser';
import db from '../models/index';
import bcrypt from 'bcryptjs';
import { where } from 'sequelize';

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let hashPassword = await hashUserPassword(data.password);
			await db.User.create({
				email: data.email,
				password: hashPassword,
				firstName: data.firstName,
				lastName: data.lastName,
				address: data.address,
				phonenumber: data.phonenumber,
				gender: data.gender === '1' ? true : false,
				roleId: data.roleId,
			});
			resolve('Create a User Successfuly');
		} catch (e) {
			reject(e);
		}
	});
};

let getAllUser = async () => {
	return new Promise(async (resolve, reject) => {
		try {
			let user = db.User.findAll({ raw: true });
			resolve(user);
		} catch (e) {
			reject(e);
		}
	});
};

let hashUserPassword = (password) => {
	return new Promise(async (resolve, reject) => {
		try {
			let hashPassword = await bcrypt.hashSync(password, salt);
			resolve(hashPassword);
		} catch (e) {
			reject(e);
		}
	});
};

let getUserById = (userId) => {
	return new Promise(async (resolve, reject) => {
		try {
			let user = await db.User.findOne({ where: { id: userId } });
			user ? resolve(user) : resolve({});
		} catch (e) {
			reject(e);
		}
	});
};

let updateUserInfo = async (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let user = await db.User.findOne({ where: { id: data.id } });
			if (user) {
				await user.update({
					firstName: data.firstName,
					lastName: data.lastName,
					address: data.address,
				});
				await user.save();
			}

			let allUsers = db.User.findAll();
			resolve(allUsers);
		} catch (e) {
			reject(e);
		}
	});
};

let deleteUserById = (userId) => {
	return new Promise(async (resolve, reject) => {
		try {
			let user = await db.User.findOne({ where: { id: userId } });
			if (user) {
				await user.destroy();
			}
			let allUsers = await db.User.findAll();
			resolve(allUsers);
		} catch (e) {
			reject(e);
		}
	});
};

module.exports = {
	createNewUser: createNewUser,
	getAllUser: getAllUser,
	getUserById: getUserById,
	updateUserInfo: updateUserInfo,
	deleteUserById: deleteUserById,
};
