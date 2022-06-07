const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const TicketModel = require('../../models/ticket');

var urlencodedParser = bodyParser.urlencoded({ limit: '10mb', extended: false });

router.get('/single/:ticket_id', urlencodedParser, (req, res) => {
	let ticket_id = req.params.ticket_id;

	
});

module.exports = router;