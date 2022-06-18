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
		related_users_names: "", // TO DO
		groups: ticket_data.groups,
		groups_names: [], // TO DO
		description: ticket_data.description,
		creator: 1, // TO DO
		creator_name: "", // TO DO
		status: ticket_data.status,
		assumers: ticket_data.assumers,
		assumers_names: [], // TO DO 
		creation_date: new Date(),
		due_date: ticket_data.due_date,
		priority: ticket_data.priority,
		attachments: ticket_data.attachments,
		messages: [],
		last_status_update_date: new Date()
	});

	await newTicketDocument.save()
	.catch(() => {res.end("Action Unsuccessful");});

	res.end("Ticket Successfully Created");
});

module.exports = router;