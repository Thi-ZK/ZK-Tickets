const AF = require('../../routes_aux/general_utils'); // AF => Aux Functions

// Check If User Is Legit To Perform The Desired Action (Ticket Creator OR Admin)
const check_user_legitimacy_max_strict = (req, res, next) => {
    let user           = req.session.user.id;
    let ticket_creator = req.body.ticket_creator;
    let user_power     = req.session.user.user_power;

    if ( user_power < 3 ) {
        return res.send(AF.generate_response_object("Not Allowed", req.body, req.originalUrl));
    }

    if ( (ticket_creator === user) || (user_power === 4) ) {
		return next();
	}

    res.send(AF.generate_response_object("Not Allowed", req.body, req.originalUrl));
}

// Check If User Is Legit To Perform The Desired Action (Ticket Creator OR Direct Action Owner OR Admin)
const check_user_legitimacy_strict = (req, res, next) => {
    let user           = req.session.user.id;
    let action_owner   = req.body.message_owner || req.body.aggregative_id || undefined;
    let ticket_creator = req.body.ticket_creator;
    let user_power     = req.session.user.user_power;

    if ( user_power < 3 ) {
        return res.send(AF.generate_response_object("Not Allowed", req.body, req.originalUrl));
    }

    if ( (action_owner === user) || (ticket_creator === user) || (user_power === 4) ) {
		return next();
	}

    res.send(AF.generate_response_object("Not Allowed", req.body, req.originalUrl));
}

// Check If User Is Legit To Perform The Desired Action (Generally Related To The Ticket OR Admin)
const check_user_legitimacy = (req, res, next) => {
    let user                 = req.session.user.id;
    let user_power           = req.session.user.user_power;
    let ticket_related_users = req.body.ticket_related_users;

    if ( user_power < 3 ) {
        return res.send(AF.generate_response_object("Not Allowed", req.body, req.originalUrl));
    }

    if ( (ticket_related_users.includes(user)) || (user_power === 4) ) {
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
    check_user_legitimacy_strict:     check_user_legitimacy_strict,
    check_user_legitimacy:            check_user_legitimacy,
    check_user_legitimacy_no_strict:  check_user_legitimacy_no_strict
};