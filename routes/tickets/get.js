const express     = require('express');
const router      = express.Router();
const bodyParser  = require('body-parser');
const TicketModel = require('../../models/ticket');
const midds       = require('../../middlewares/general_utils');

let urlencodedParser = bodyParser.urlencoded( { limit: '10mb', extended: false } );

router.get('/all', urlencodedParser, async (req, res) => {
	let error       = false;
	let all_tickets = await TicketModel.find().catch((error) => { error = error; });

	res.send(midds.generate_response_object(error, all_tickets, req.originalUrl));
});

router.get('/single/:ticket_id', urlencodedParser, async (req, res) => {
	let ticket_id = req.params.ticket_id;
	let error     = false;
	let ticket    = await TicketModel.findOne({id: ticket_id}).select().catch((error) => { error = error; });

	if (!ticket) {
		error = "Ticket Not Found";
	}
	
	res.send(midds.generate_response_object(error, ticket, req.originalUrl));
});

module.exports = router;