const AF = require('../../routes_aux/general_utils'); // AF => Aux Functions

// (SERVES ALL) Check If User Is Legit To Perform The Desired Action (Must Be Ticket Creator OR Admin)
const check_user_legitimacy_max_strict = (req, res, next) => {
    let user           = req.session.user.id;
    let ticket_creator = req.body.ticket_creator;
    let user_power     = req.session.user.user_power;

    if ( (ticket_creator === user) || (user_power === 4) ) {
		return next();
	}

    res.send(AF.generate_response_object("Not Allowed", req.body, req.originalUrl));
}

// (SERVES ALL) Check If User Is Legit To Perform The Desired Action (Must Be Ticket Creator OR Direct Action Owner OR Admin)
const check_user_legitimacy_strict = (req, res, next) => {
    let user           = req.session.user.id;
    let action_owner   = req.body.message_owner || req.body.aggregative_id || undefined;
    let ticket_creator = req.body.ticket_creator;
    let user_power     = req.session.user.user_power;

    if ( (action_owner === user) || (ticket_creator === user) || (user_power === 4) ) {
		return next();
	}

    res.send(AF.generate_response_object("Not Allowed", req.body, req.originalUrl));
}

// (SERVES ALL) Check If User Is Legit To Perform The Desired Action (Must Be Generally Related To The Ticket OR Admin)
const check_user_legitimacy = (req, res, next) => {
    let user_data  = req.session.user;
    let user_power = req.session.user.user_power;
    let ticket_id  = req.body.ticket_id;
    
    return next(); // UNTIL RELATED TICKETS ARE FINISHED

    if ( (user_data.related_ticket.includes(ticket_id)) || (user_power === 4) ) {
		return next();
	}

    res.send(AF.generate_response_object("Not Allowed", req.body, req.originalUrl));
}

module.exports = {
    check_user_legitimacy_max_strict: check_user_legitimacy_max_strict,
    check_user_legitimacy_strict:     check_user_legitimacy_strict,
    check_user_legitimacy:            check_user_legitimacy
};