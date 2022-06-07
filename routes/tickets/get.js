const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const TicketModel = require('../../models/ticket');

var urlencodedParser = bodyParser.urlencoded( { limit: '10mb', extended: false } );

router.get('/all', urlencodedParser, async (req, res) => {
	let all_tickets = await TicketModel.find()
	.catch((error) => {res.end(JSON.stringify(error));});

	res.end(JSON.stringify(all_tickets));
});

router.get('/single/:ticket_id', urlencodedParser, async (req, res) => {
	let ticket_id = req.params.ticket_id;

	let ticket = await TicketModel.find({id: ticket_id})
	.catch((error) => {res.end(JSON.stringify(error));});
	
	res.end(JSON.stringify(ticket));
});

module.exports = router;