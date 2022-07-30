const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const UserModel = require('../../models/user');

let urlencodedParser = bodyParser.urlencoded( { limit: '10mb', extended: false } );

// Update Current (User Who Made The Request) User Preferred Language
router.post('/current/preferred_language', urlencodedParser, async (req, res) => {
    let preferred_language = req.body.preferred_language;
    let user_id = Number(req.session.user.id);

    await UserModel.updateOne({ id: user_id }, { preferred_language: preferred_language });

	res.send(JSON.stringify({
        data: preferred_language,
		success: true,
		requested: "Update Current User Preferred Language"
	}));
});

module.exports = router;