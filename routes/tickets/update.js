const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const TicketModel = require('../../models/ticket');

var urlencodedParser = bodyParser.urlencoded({ limit: '10mb', extended: false });

// Meant For Setting A New Message For A Single Ticket
router.post('/single/messages/set/:ticket_id', urlencodedParser, async (req, res) => {
	let ticket_id = req.params.ticket_id;
	let ticket = await TicketModel.find({id: ticket_id}).catch((error) => {return res.end("Ticket Not Found")});
	let new_message = {
		message: req.body.message,
		date: new Date(),
		date_casual_format: Date(),
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

// Meant For Deleting A Message For A Single Ticket
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

// Meant For Setting A New Status For A Single Ticket
router.post('/single/status/:ticket_id', urlencodedParser, async (req, res) => {
	let ticket_id = req.params.ticket_id;
	let new_status = req.body.new_status;

	await TicketModel.updateOne({id: ticket_id}, {last_status_update_date: new Date(), status: new_status})
	.catch((error) => {return res.end("Action Unsuccessful");});
	
	res.end("Ticket Updated");
});

// Meant For Setting A New Assigned User For A Single Ticket
router.post('/single/assigneds/set/:ticket_id', urlencodedParser, async (req, res) => {
	let ticket_id = req.params.ticket_id;
	let new_assigned_id = req.body.assignedId;
	let new_assigned_name = req.body.assignedName;

	let ticket = await TicketModel.find({id: ticket_id}).catch((error) => {return res.end("Ticket Not Found")});
	let new_assumers = ticket[0].assumers; new_assumers.push(new_assigned_id);
	let new_assumers_names = ticket[0].assumers_names; new_assumers_names.push(new_assigned_name);

	await TicketModel.updateOne({id: ticket_id}, {assumers: new_assumers, assumers_names: new_assumers_names})
	.catch((error) => {return res.end("Action Unsuccessful");});
	
	res.end("Ticket Updated");
});

module.exports = router;