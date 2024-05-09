import userServices from '../services/userServices';

let handleLogin = async (req, res) => {
	let email = req.body.email;
	let password = req.body.password;

	// Check email exist
	if (!email || !password) {
		return res.status(500).json({
			errCode: 1,
			message: 'Misssing inputs parameter!',
		});
	}

	let userData = await userServices.handleUserLogin(email, password);
	console.log(userData);
	return res.status(200).json({
		errCode: userData.errCode,
		errMessage: userData.errMessage,
		user: userData.user ? userData.user : {},
	});
};

let handleGetAllUsers = async (req, res) => {
	let id = req.query.id;
	if (!id) {
		return res.status(200).json({
			errCode: 1,
			errMessage: 'Missing required parameters',
			users: [],
		});
	}

	let users = await userServices.getAllUsers(id);

	return res.status(200).json({
		errCode: 0,
		errMessage: 'OK',
		users,
	});
};

let handleCreateNewUser = async (req, res) => {
	let message = await userServices.createNewUser(req.body);
	return res.status(200).json(message);
};

let handleDeleteUser = async (req, res) => {
	if (!req.body.id) {
		return res.status(200).json({
			errCode: 1,
			errMessage: 'Missing required parameters!',
		});
	}
	let message = await userServices.deleteUser(req.body.id);
	return res.status(200).json(message);
};

let handleEditUser = async (req, res) => {
	let data = req.body;
	let message = await userServices.updateUserData(data);
	return res.status(200).json(message);
};

module.exports = {
	handleLogin: handleLogin,
	handleGetAllUsers: handleGetAllUsers,
	handleCreateNewUser: handleCreateNewUser,
	handleEditUser: handleEditUser,
	handleDeleteUser: handleDeleteUser,
};
