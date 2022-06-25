const express = require('express');
const router = express.Router();
const UserModel = require('../models/user');

router.post('/auth', async (req, res) => {
	let email = req.body.email;
	let password = req.body.password;
	let user = await UserModel.findOne({ email }).select();

	if (!user) {
		return res.end("User Doesn't Exist");
	}

	if (password === user.password) {
		req.session.user = user;
		res.end(JSON.stringify(user));
	} else {
		res.end("Password Incorrect");
	}
});

module.exports = router;