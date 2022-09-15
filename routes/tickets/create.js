const express     = require('express');
const TicketModel = require('../../models/ticket');
const GroupModel  = require('../../models/ticket_group');
const router      = express.Router();
const AF          = require('../../routes_aux/general_utils'); // AF => Aux Functions
const R_AF        = require('../../routes_aux/tickets/create'); // Specific Current Route Aux | R_AF => Route Aux Functions

router.post('/single', async (req, res) => {
	let error          = false;
	let ticket_data    = req.body;
	let last_ticket    = await TicketModel.find().sort({_id:-1}).limit(1).catch((err) => { error = [err]; });
	let new_group_name = ticket_data.new_group;

	// If New Group Was Provided, Then Check If Exists (If Not, New ID Given) And Add It 
	if ( new_group_name ) {
		await R_AF.add_new_group_to_ticket_and_to_database(ticket_data, new_group_name, GroupModel, req.session.user).catch((err) => { error = err });
	}

	const newTicketDocument = new TicketModel({
		name:                    ticket_data.name,
		id:                      last_ticket[0].id + 1,
		related_users:           ticket_data.related_users,
		related_users_names:     ticket_data.related_users_names,
		groups:                  ticket_data.groups,
		groups_names:            ticket_data.groups_names,
		description:             ticket_data.description,
		creator:                 req.session.user.id,
		creator_name:            req.session.user.name,
		status:                  ticket_data.status,
		assumers:                ticket_data.assumers,
		assumers_names:          ticket_data.assumers_names,
		creation_date:           new Date(),
		due_date:                ticket_data.due_date,
		priority:                ticket_data.priority,
		attachments:             ticket_data.attachments,
		messages:                [],
		last_status_update_date: new Date()
	});

	await newTicketDocument.save().catch((err) => { error = error ? error.push(err) : [err]; });

	if ( !error && new_group_name ) { // Add New Created Ticket ID To Tickets Array In The New Group Created 
		await GroupModel.updateOne({ name: new_group_name }, { tickets: [newTicketDocument.id] }).catch((err) => { error = err });
	}
	
	res.send(AF.generate_response_object(error, newTicketDocument, req.originalUrl));
});

module.exports = router;