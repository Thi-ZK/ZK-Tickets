const AF = require('../routes_aux/general_utils'); // AF => Aux Functions

// Restrict User Access To Content Unless He / She Is Logged In
const check_user_logged_state_and_restrict_access_if_not_logged_in = (req, res, next) => {
    if ( !AF.all_server_routes_paths.includes(req.path) || (req.path === "/login/auth") ) {
        return next();
    }

    if ( !req.session.user ) {
        res.send(AF.generate_response_object("Not Authenticated", null, req.path));
    } else {
        next();
    }
}

module.exports = {
    check_user_logged_state_and_restrict_access_if_not_logged_in: check_user_logged_state_and_restrict_access_if_not_logged_in
};