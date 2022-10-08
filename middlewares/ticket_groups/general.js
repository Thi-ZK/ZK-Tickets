const AF = require('../../routes_aux/general_utils'); // AF => Aux Functions

// Check If User Is Legit To Perform The Desired Action (Ticket Creator OR Admin)
const check_user_legitimacy_max_strict = (req, res, next) => {
    let user                 = req.session.user.id;
    let groups_to_be_deleted = req.body.groups_to_be_deleted;
    let user_power           = req.session.user.user_power;

    if ( user_power < 3 ) {
        return res.send(AF.generate_response_object("Not Allowed", req.body, req.originalUrl));
    }

    let is_there_a_group_that_user_is_not_creator = false;
    
    groups_to_be_deleted.forEach((group) => {
        if ( group.creator !== user ) {
            is_there_a_group_that_user_is_not_creator = true;
        }
    });

    if ( !is_there_a_group_that_user_is_not_creator || (user_power === 4) ) {
		return next();
	}

    res.send(AF.generate_response_object("Not Allowed", req.body, req.originalUrl));
}

// Check If User Is Legit To Perform The Desired Action (At Least Power Above 2)
const check_user_legitimacy_no_strict = (req, res, next) => {
    if ( req.session.user.user_power > 2 ) {
        return next();
    } else {
        res.send(AF.generate_response_object("Not Allowed", req.body, req.originalUrl));
    }
}

module.exports = {
    check_user_legitimacy_max_strict: check_user_legitimacy_max_strict,
    check_user_legitimacy_no_strict:  check_user_legitimacy_no_strict
};