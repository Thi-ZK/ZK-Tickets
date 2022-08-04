const express    = require('express');
const router     = express.Router();
const bodyParser = require('body-parser');
const UserModel  = require('../../models/user');
const midds      = require('../../middlewares/general_utils');

let urlencodedParser = bodyParser.urlencoded( { limit: '10mb', extended: false } );

// Update Current User Preferred Language
router.post('/current/preferred_language', urlencodedParser, async (req, res) => {
    let preferred_language = req.body.preferred_language;
    let user_id            = Number(req.session.user.id);
    let error              = false;

    await UserModel.updateOne({ id: user_id }, { preferred_language: preferred_language }).catch((error) => { error = error; });
    req.session.user.preferred_language = preferred_language;

	res.send(midds.generate_response_object(error, req.body, req.originalUrl));
});

// Update Current User Preferred Brightness Theme
router.post('/current/preferred_brightness_theme', urlencodedParser, async (req, res) => {
    let preferred_theme = req.body.preferred_brightness_theme;
    let user_id         = Number(req.session.user.id);
    let error           = false;

    await UserModel.updateOne({ id: user_id }, { preferred_brightness_theme: preferred_theme }).catch((error) => { error = error; });
    req.session.user.preferred_brightness_theme = preferred_theme;

	res.send(midds.generate_response_object(error, req.body, req.originalUrl));
});

module.exports = router;