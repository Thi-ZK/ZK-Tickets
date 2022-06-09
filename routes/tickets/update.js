const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const TicketModel = require('../../models/ticket');

var urlencodedParser = bodyParser.urlencoded({ limit: '10mb', extended: false });

router.post('/single/:ticket_id', urlencodedParser, async (req, res) => {
	let ticket_id = req.params.ticket_id;
	let data_to_be_updated = req.body.data_to_be_updated;

	await TicketModel.updateOne({id: ticket_id}, data_to_be_updated)
	.catch(() => {res.end("Action Unsuccessful");});

	res.end("Ticket Updated");
});

module.exports = router;