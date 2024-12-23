const express   = require('express');
const UserModel = require('../models/user');
const router    = express.Router();
const AF        = require('../routes_aux/general_utils'); // AF => Generic Aux Functions

// Authentication Route (Sets Session Cookie)
router.post('/auth', async (req, res) => {
	let email    = req.body.email;
	let password = req.body.password;
	let error    = false;
	let user     = await UserModel.findOne({ email }).select().catch((err) => { error = err; });

	if ( user ) {
		if ( password === user.password ) {
			req.session.user = user; // This Sets Session Cookie Automatically
		} else {
			error = "Password Incorrect";
		}
	} else {
		error = "User Doesn't Exist";
	}

	res.send(AF.generate_response_object(error, req.body, req.originalUrl));
});

// Password Recovery
router.post('/password_recovery', async (req, res) => {
	let email             = req.body.email;
	let error             = false;
	let does_email_exists = await UserModel.findOne({ email }).select().catch((err) => { error = err; }) ? true : false;

	if ( !does_email_exists ) {
		error = "Email Does Not Exist";
	}
	
	res.send(AF.generate_response_object(error, req.body, req.originalUrl));
});

// Logout (Destroys Session)
router.get('/logout', (req, res) => {
	req.session.destroy();
	res.clearCookie('connect.sid');
	res.send(AF.generate_response_object(null, "Session Destroyed", req.originalUrl));
});

module.exports = router;