const express   = require('express');
const UserModel = require('../../models/user');
const router    = express.Router();
const AF        = require('../../routes_aux/general_utils'); // AF   => Generic Aux Functions
const R_AF      = require('../../routes_aux/users/get');     // R_AF => Route   Aux Functions (Specific For This Route)

// Retrieves Current User
router.get('/single/current', (req, res) => {
	res.send(AF.generate_response_object(false, req.session.user, req.originalUrl));
});

// Retrieve All Users Names & IDs (More Info In Documentation)
router.get('/piece/all_users', async (req, res) => {
	let all_users            = await UserModel.find();
	let users_ids_with_names = R_AF.generate_user_names_with_ids_obj(all_users);

	res.send(AF.generate_response_object(false, users_ids_with_names, req.originalUrl));
});

module.exports = router;