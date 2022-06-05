const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const TicketModel = require('../../models/ticket');

var urlencodedParser = bodyParser.urlencoded( { limit: '10mb', extended: false } );

router.get('/all', urlencodedParser, (req, res) => {
    TicketModel.find().then( (data) => {
		res.end(JSON.stringify(data));
	}).catch((error) => {
		res.end(JSON.stringify(error));
	});
});

router.get('/single', urlencodedParser, (req, res) => {
	TicketModel.find().then( (data) => {
		res.end(JSON.stringify(data));
	}).catch((error) => {
		res.end(JSON.stringify(error));
	});
});

module.exports = router;