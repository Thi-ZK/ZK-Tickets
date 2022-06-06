const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const TicketModel = require('../../models/ticket');

var urlencodedParser = bodyParser.urlencoded({ limit: '10mb', extended: false });

router.post('/single', urlencodedParser, async (req, res) => {
	let ticket_data = req.body;
	let last_ticket = await TicketModel.find().sort({_id:-1}).limit(1)
	.catch(() => {res.end("Something Went Wrong");});

	console.log(ticket_data);
	return res.end();

	const newTicketDocument = new TicketModel({
		name: ticket_data.name,
		id: last_ticket[0].id + 1,
		related_users: ticket_data.related_users,
		groups: ticket_data.groups,
		description: ticket_data.description,
		creator: 1, // TO DO
		status: ticket_data.status,
		assumers: ticket_data.assumers,
		creation_date: Date(),
		due_date: ticket_data.due_date,
		priority: ticket_data.priority,
		attachments: ticket_data.attachments,
		messages: []
	});

	await newTicketDocument.save()
	.catch(() => {res.end("Action Unsuccessful");});

	res.end("Ticket Successfully Created");
});

module.exports = router;