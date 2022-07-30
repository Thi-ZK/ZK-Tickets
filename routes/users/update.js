const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const UserModel = require('../../models/user');

let urlencodedParser = bodyParser.urlencoded( { limit: '10mb', extended: false } );

// Update Current (User Who Made The Request) User Preferred Language
router.get('/current/preferred_language', urlencodedParser, (req, res) => {
    let preferred_language = req.body.preferred_language;

    await UserModel.updateOne({ id: ticket_id }, { preferred_language: preferred_language });

	res.send(JSON.stringify({
        data: preferred_language,
		success: true,
		requested: "Update Current User Preferred Language"
	}));
});

module.exports = router;