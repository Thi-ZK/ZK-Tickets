const express     = require('express');
const TicketModel = require('../../models/ticket');
const router      = express.Router();
const AF          = require('../../routes_aux/general_utils'); // AF => Aux Functions

router.get('/all', async (req, res) => {
	let error       = false;
	let all_tickets = await TicketModel.find().catch((err) => { error = err; });

	res.send(AF.generate_response_object(error, all_tickets, req.originalUrl));
});

router.get('/single/:ticket_id', async (req, res) => {
	let ticket_id = req.params.ticket_id;
	let error     = false;
	let ticket    = await TicketModel.findOne({id: ticket_id}).select().catch((err) => { error = err; });

	if ( !ticket ) {
		error = "Ticket Not Found";
	}
	
	res.send(AF.generate_response_object(error, ticket, req.originalUrl));
});

module.exports = router;