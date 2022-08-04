const express   = require('express');
const router    = express.Router();
const UserModel = require('../models/user');
const midds     = require('../middlewares/general_utils');

router.post('/auth', async (req, res) => {
	let email    = req.body.email;
	let password = req.body.password;
	let error    = false;
	let user     = await UserModel.findOne({ email }).select().catch((error) => { error = error; });

	if ( user ) {
		if ( password === user.password ) {
			req.session.user = user;
		} else {
			error = "Password Incorrect";
		}
	} else {
		error = "User Doesn't Exist";
	}

	res.send(midds.generate_response_object(error, req.body, req.originalUrl));
});

router.get('/logout', (req, res) => {
	req.session.destroy();
	res.clearCookie('connect.sid');
	res.end("Session Destroyed");
});

module.exports = router;