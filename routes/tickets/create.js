const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const TicketModel = require('../../models/ticket');

var urlencodedParser = bodyParser.urlencoded({ limit: '10mb', extended: false });

router.post('/single', urlencodedParser, async (req, res) => {
	let ticket_data = req.body;
	let last_ticket = await TicketModel.find().sort({_id:-1}).limit(1);

	const newTicketDocument = new TicketModel({
		name: ticket_data.name,
		id: last_ticket[0].id + 1,
		related_users: [], // TO DO
		related_users_names: ticket_data.related_users_names,
		groups: [], // TO DO
		groups_names: ticket_data.groups_names,
		description: ticket_data.description,
		creator: req.session.user.id,
		creator_name: req.session.user.name,
		status: ticket_data.status,
		assumers: [], // TO DO
		assumers_names: ticket_data.assumers_names,
		creation_date: new Date(),
		due_date: ticket_data.due_date,
		priority: ticket_data.priority,
		attachments: ticket_data.attachments,
		messages: [],
		last_status_update_date: new Date()
	});

	console.log(newTicketDocument);
	return res.end();

	await newTicketDocument.save()
	.catch(() => {res.end("Action Unsuccessful");});

	res.end("Ticket Successfully Created");
});

module.exports = router;