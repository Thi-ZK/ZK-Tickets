const express   = require('express');
const UserModel = require('../../models/user');
const router    = express.Router();
const AF        = require('../../routes_aux/general_utils'); // AF => Generic Aux Functions

// Update Current User Preferred Language
router.post('/current/preferred_language', async (req, res) => {
    let preferred_language = req.body.preferred_language;
    let user_id            = Number(req.session.user.id);
    let error              = false;
    
    let data = {
        preferred_language: preferred_language
    };

    await UserModel.updateOne({ id: user_id }, data).catch((err) => { error = err; });
    req.session.user.preferred_language = preferred_language;

	res.send(AF.generate_response_object(error, req.body, req.originalUrl));
});

// Update Current User Preferred Brightness Theme
router.post('/current/preferred_brightness_theme', async (req, res) => {
    let preferred_theme = req.body.preferred_brightness_theme;
    let user_id         = Number(req.session.user.id);
    let error           = false;

    let data = {
        preferred_brightness_theme: preferred_theme
    };

    await UserModel.updateOne({ id: user_id }, data).catch((err) => { error = err; });
    req.session.user.preferred_brightness_theme = preferred_theme;

	res.send(AF.generate_response_object(error, req.body, req.originalUrl));
});

module.exports = router;