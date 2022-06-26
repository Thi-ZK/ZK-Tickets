const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const UserModel = require('../../models/user');

let urlencodedParser = bodyParser.urlencoded( { limit: '10mb', extended: false } );

router.get('/all', urlencodedParser, async (req, res) => {
	let all_users = await UserModel.find()
	res.end(JSON.stringify(all_users));
});

router.get('/single/current', urlencodedParser, (req, res) => {
	res.end(JSON.stringify(req.session.user));
});

module.exports = router;