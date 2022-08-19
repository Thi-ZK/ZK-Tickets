const express   = require('express');
const UserModel = require('../models/user');
const router    = express.Router();
const AF        = require('../routes_aux/general_utils'); // AF => Aux Functions

router.post('/auth', async (req, res) => {
	let email    = req.body.email;
	let password = req.body.password;
	let error    = false;
	let user     = await UserModel.findOne({ email }).select().catch((err) => { error = err; });

	if ( user ) {
		if ( password === user.password ) {
			req.session.user = user;
		} else {
			error = "Password Incorrect";
		}
	} else {
		error = "User Doesn't Exist";
	}

	res.send(AF.generate_response_object(error, req.body, req.originalUrl));
});

router.get('/logout', (req, res) => {
	req.session.destroy();
	res.clearCookie('connect.sid');
	res.end("Session Destroyed");
});

module.exports = router;