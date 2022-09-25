// Get Ticket Data
const get_ticket_data = (allTickets, ticket_id) => {
	return allTickets.filter((elem) => { return elem.id === Number(ticket_id) })[0];
}

// Check Ticket Legitimacy & Send To 404 Page In Case Not Legit
const check_ticket_legitimacy = (ticket_data, ticket_id) => {
	if ( !ticket_data || (ticket_id > 5000) ) {
		window.location.href = "/ticket_does_not_exist";
	}
}

module.exports = {
	get_ticket_data:         get_ticket_data,
	check_ticket_legitimacy: check_ticket_legitimacy
};