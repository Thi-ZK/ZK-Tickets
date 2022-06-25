const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const TicketModel = require('../../models/ticket');

var urlencodedParser = bodyParser.urlencoded({ limit: '10mb', extended: false });

router.get('/single/:ticket_id', urlencodedParser, async (req, res) => {
	let ticket_id = Number(req.params.ticket_id);
	
	await TicketModel.deleteOne({id: ticket_id})

	res.end("Ticket Deleted");
});

module.exports = router;