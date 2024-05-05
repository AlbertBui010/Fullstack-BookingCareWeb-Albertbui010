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
	// Compare password
	// Return userInfor
	// access_token: JWT json web token

	return res.status(200).json({
		errCode: userData.errCode,
		errMessage: userData.errMessage,
		user: userData.user ? userData.user : {},
	});
};

module.exports = {
	handleLogin: handleLogin,
};