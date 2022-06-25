const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const TicketModel = require('../../models/ticket');

let urlencodedParser = bodyParser.urlencoded( { limit: '10mb', extended: false } );

router.get('/all', urlencodedParser, async (req, res) => {
	let all_tickets = await TicketModel.find()

	res.end(JSON.stringify(all_tickets));
});

router.get('/single/:ticket_id', urlencodedParser, async (req, res) => {
	let ticket_id = req.params.ticket_id;

	let ticket = await TicketModel.findOne({id: ticket_id}).select();

	if (!ticket) {
		return res.end("Ticket Not Found");
	}
	
	res.end(JSON.stringify(ticket));
});

module.exports = router;