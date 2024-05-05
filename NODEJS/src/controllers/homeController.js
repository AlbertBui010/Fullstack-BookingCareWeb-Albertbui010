import db from '../models/index';
import CRUDServices from '../services/CRUDServices';

let getHomePage = async (req, res) => {
	try {
		let data = await db.User.findAll();
		return res.render('homepage.ejs', {
			data: JSON.stringify(data),
		});
	} catch (e) {
		console.log(e);
	}
};

let getAboutPage = async (req, res) => {
	return res.render('test/about.ejs');
};

let getCRUD = async (req, res) => {
	return res.render('crud.ejs');
};

let postCRUD = async (req, res) => {
	let mess = await CRUDServices.createNewUser(req.body);
	return res.send(mess);
};

let displayGetCRUD = async (req, res) => {
	let data = await CRUDServices.getAllUser();
	console.log(data);
	return res.render('displayCRUD.ejs', {
		dataTable: data,
	});
};

let getEditCRUD = async (req, res) => {
	let userId = req.query.id;
	if (userId) {
		let user = await CRUDServices.getUserById(userId);
		// Check user exists

		return res.render('editCRUD.ejs', {
			user: user,
		});
	} else {
		return res.send('Id field is empty!!!');
	}
};

let putCRUD = async (req, res) => {
	let data = req.body;
	if (data) {
		let allUsers = await CRUDServices.updateUserInfo(data);
		return res.render('displayCRUD.ejs', {
			dataTable: allUsers,
		});
	}
	return res.send('ERROR');
};

let deleteCRUD = async (req, res) => {
	let id = req.query.id;
	if (id) {
		let allUsers = await CRUDServices.deleteUserById(id);
		return res.render('displayCRUD.ejs', {
			dataTable: allUsers,
		});
	} else {
		return res.send('Id not found');
	}
};

module.exports = {
	getHomePage: getHomePage,
	getAboutPage: getAboutPage,
	getCRUD: getCRUD,
	postCRUD: postCRUD,
	displayGetCRUD: displayGetCRUD,
	getEditCRUD: getEditCRUD,
	putCRUD: putCRUD,
	deleteCRUD: deleteCRUD,
};
