const express     = require('express');
const router      = express.Router();
const bodyParser  = require('body-parser');
const TicketModel = require('../../models/ticket');
const midds       = require('../../middlewares/general_utils');

var urlencodedParser = bodyParser.urlencoded({ limit: '10mb', extended: false });

router.post('/single', urlencodedParser, async (req, res) => {
	let ticket_data = req.body;
	let last_ticket = await TicketModel.find().sort({_id:-1}).limit(1).catch((error) => { error = error; })
	let error       = false;

	const newTicketDocument = new TicketModel({
		name: ticket_data.name,
		id: last_ticket[0].id + 1,
		related_users: ticket_data.related_users,
		related_users_names: ticket_data.related_users_names,
		groups: ticket_data.groups,
		groups_names: ticket_data.groups_names,
		description: ticket_data.description,
		creator: req.session.user.id,
		creator_name: req.session.user.name,
		status: ticket_data.status,
		assumers: ticket_data.assumers,
		assumers_names: ticket_data.assumers_names,
		creation_date: new Date(),
		due_date: ticket_data.due_date,
		priority: ticket_data.priority,
		attachments: ticket_data.attachments,
		messages: [],
		last_status_update_date: new Date()
	});

	await newTicketDocument.save().catch((error) => { error = error; });

	res.send(midds.generate_response_object(error, newTicketDocument, req.originalUrl));
});

module.exports = router;