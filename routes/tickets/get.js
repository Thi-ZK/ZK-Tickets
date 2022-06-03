const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const TicketModel = require('../../models/ticket');

var urlencodedParser = bodyParser.urlencoded({ limit: '10mb', extended: false });

router.get('/all', urlencodedParser, (req, res) => {
    TicketModel.find().then( (data) => {
		res.end(data);
	}).catch((error) => {
		res.end(JSON.stringify(error));
	});
});

router.get('/single', urlencodedParser, (req, res) => {
    

	newTicketDocument.save().then(() => {
		res.end("Ticket Successfully Created");
	}).catch(() => {
		res.end("Action Unsuccessful");
	});
});

module.exports = router;