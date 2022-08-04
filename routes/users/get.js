const express    = require('express');
const router     = express.Router();
const bodyParser = require('body-parser');
const UserModel  = require('../../models/user');
const midds      = require('../../middlewares/general_utils');

let urlencodedParser = bodyParser.urlencoded( { limit: '10mb', extended: false } );

// Retrieve Current User
router.get('/single/current', urlencodedParser, (req, res) => {
	res.send(midds.generate_response_object(false, req.session.user, req.originalUrl));
});

// Retrieve All Users Names & IDs. (Piece means it only retrieves a piece of data from the whole User Data)
router.get('/piece/all_users', urlencodedParser, async (req, res) => {
	let all_users = await UserModel.find();
	let users_ids_with_names = {};

	for (let i = 0; i < all_users.length; i++) {
		users_ids_with_names[all_users[i].id] = all_users[i].name;
	}

	res.send(midds.generate_response_object(false, users_ids_with_names, req.originalUrl));
});


module.exports = router;