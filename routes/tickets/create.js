const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const TicketModel = require('../../models/ticket');

var urlencodedParser = bodyParser.urlencoded({ limit: '10mb', extended: false });

router.get('/create', urlencodedParser, (req, res) => {
	const newTicketDocument = new TicketModel({
		
	});

	newTicketDocument.save().then(() => {
		res.end("Ticket Successfully Created");
	}).catch(() => {
		res.end("Action Unsuccessful");
	});
});

module.exports = router;