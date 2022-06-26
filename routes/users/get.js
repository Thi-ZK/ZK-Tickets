const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const UserModel = require('../../models/user');

let urlencodedParser = bodyParser.urlencoded( { limit: '10mb', extended: false } );

// Retrieve Current User
router.get('/single/current', urlencodedParser, (req, res) => {
	res.end(JSON.stringify(req.session.user));
});

// Retrieve All Users Names & IDs. (Piece means it only retrieves a piece of data from the whole)
router.get('/piece/all_users', urlencodedParser, async (req, res) => {
	let all_users = await UserModel.find();
	let users_ids_with_names = {};

	for (let i = 0; i < all_users.length; i++) {
		users_ids_with_names[all_users[i].id] = all_users[i].name;
	}

	res.end(JSON.stringify(users_ids_with_names));
});


module.exports = router;