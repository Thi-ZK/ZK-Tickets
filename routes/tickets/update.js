const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const TicketModel = require('../../models/ticket');

var urlencodedParser = bodyParser.urlencoded({ limit: '10mb', extended: false });

// Meant For Setting A New Message For A Single Ticket
router.post('/single/messages/set/:ticket_id', urlencodedParser, async (req, res) => {
	let ticket_id = req.params.ticket_id;
	let ticket = await TicketModel.findOne({id: ticket_id}).select();

	if (!ticket) {
		return res.end("Ticket Not Found");
	}

	let new_message = {
		message: req.body.message,
		date: new Date(),
		date_casual_format: Date(),
		id: ticket.messages.length + 1,
		message_owner: 1, // TO DO
		message_owner_name: "Athalia Sieghart", // TO DO
		status: "alive"
	}

	ticket.messages.push(new_message);
	let messages_array_to_be_updated = ticket.messages;

	await TicketModel.updateOne({id: ticket_id}, {messages: messages_array_to_be_updated})

	res.end("Ticket Updated");
});

// Meant For Deleting A Message For A Single Ticket
router.post('/single/messages/delete/:ticket_id/:message_id', urlencodedParser, async (req, res) => {
	let ticket_id = req.params.ticket_id;
	let message_id = req.params.message_id;
	let ticket = await TicketModel.findOne({id: ticket_id}).select();

	if (!ticket) {
		return res.end("Ticket Not Found");
	}

	let messages_array_to_be_updated = ticket.messages;
	messages_array_to_be_updated[message_id - 1].status = "deleted";

	await TicketModel.updateOne({id: ticket_id}, {messages: messages_array_to_be_updated})

	res.end("Ticket Updated");
});

// Meant For Setting A New Status For A Single Ticket
router.post('/single/status/:ticket_id', urlencodedParser, async (req, res) => {
	let ticket_id = req.params.ticket_id;
	let new_status = req.body.new_status;
	
	await TicketModel.updateOne({id: ticket_id}, {last_status_update_date: new Date(), status: new_status});
	
	res.end("Ticket Updated");
});

// Meant For Setting A New Assigned User For A Single Ticket
router.post('/single/assigneds/set/:ticket_id', urlencodedParser, async (req, res) => {
	let ticket_id = req.params.ticket_id;
	let new_assigned_id = req.body.assignedId;
	let new_assigned_name = req.body.assignedName;
	let ticket = await TicketModel.findOne({id: ticket_id}).select();

	if (!ticket) {
		return res.end("Ticket Not Found");
	}

	let new_assumers = ticket.assumers;
	new_assumers.push(new_assigned_id);

	let new_assumers_names = ticket.assumers_names;
	new_assumers_names.push(new_assigned_name);

	await TicketModel.updateOne({id: ticket_id}, {assumers: new_assumers, assumers_names: new_assumers_names})
	
	res.end("Ticket Updated");
});

// Meant For Deleting A Assigned User For A Single Ticket
router.post('/single/assigneds/delete/:ticket_id', urlencodedParser, async (req, res) => {
	let ticket_id = req.params.ticket_id;
	let assigned_id = req.body.assignedId;
	let assigned_name = req.body.assignedName;
	let ticket = await TicketModel.findOne({id: ticket_id}).select();

	if (!ticket) {
		return res.end("Ticket Not Found");
	}

	let new_assumers = ticket.assumers
	.filter((id) => {return id !== assigned_id});

	let new_assumers_names = ticket.assumers_names
	.filter((name) => {return name !== assigned_name});

	await TicketModel.updateOne({id: ticket_id}, {assumers: new_assumers, assumers_names: new_assumers_names})
	
	res.end("Ticket Updated");
});

module.exports = router;