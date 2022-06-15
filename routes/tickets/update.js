const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const TicketModel = require('../../models/ticket');

var urlencodedParser = bodyParser.urlencoded({ limit: '10mb', extended: false });

router.post('/single/messages/:ticket_id', urlencodedParser, async (req, res) => {
	let ticket_id = req.params.ticket_id;
	let new_message = {
		message: req.body.message,
		date: Date(),
		message_owner: 1, // TO DO
		message_owner_name: "Athalia Sieghart" // TO DO
	}
	let ticket = await TicketModel.find({id: ticket_id}).catch((error) => {res.end("Ticket Not Found")});
	ticket[0].messages.push(new_message);
	let messages_array_to_be_updated = ticket[0].messages;

	await TicketModel.updateOne({id: ticket_id}, {messages: messages_array_to_be_updated})
	.catch(() => {res.end("Action Unsuccessful");});

	res.end("Ticket Updated");
});

module.exports = router;