const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const TicketModel = require('../../models/ticket');

var urlencodedParser = bodyParser.urlencoded({ limit: '10mb', extended: false });

router.post('/single/messages/set/:ticket_id', urlencodedParser, async (req, res) => {
	let ticket_id = req.params.ticket_id;
	let ticket = await TicketModel.find({id: ticket_id}).catch((error) => {return res.end("Ticket Not Found")});
	let new_message = {
		message: req.body.message,
		date: Date(),
		id: ticket[0].messages.length + 1,
		message_owner: 1, // TO DO
		message_owner_name: "Athalia Sieghart" // TO DO
	}

	ticket[0].messages.push(new_message);
	let messages_array_to_be_updated = ticket[0].messages;

	await TicketModel.updateOne({id: ticket_id}, {messages: messages_array_to_be_updated})
	.catch(() => {return res.end("Action Unsuccessful");});

	res.end("Ticket Updated");
});

router.post('/single/messages/delete/:ticket_id/:message_id', urlencodedParser, async (req, res) => {
	let ticket_id = req.params.ticket_id;
	let message_id = req.params.message_id;

	let ticket = await TicketModel.find({id: ticket_id})
	.catch((error) => {return res.end("Ticket Not Found")});

	let messages_array_to_be_updated = ticket[0].messages.filter((msg) => {
		return msg.id !== Number(message_id);
	});

	await TicketModel.updateOne({id: ticket_id}, {messages: messages_array_to_be_updated})
	.catch((error) => {return res.end("Action Unsuccessful");});

	res.end("Ticket Updated");
});

router.post('/single/status/:ticket_id', urlencodedParser, async (req, res) => {
	let ticket_id = req.params.ticket_id;
	let new_status = req.body.new_status;

	await TicketModel.updateOne({id: ticket_id}, {last_status_update_date: Date(), status: new_status})
	.catch((error) => {return res.end("Action Unsuccessful");});
	
	res.end("Ticket Updated");
});

module.exports = router;