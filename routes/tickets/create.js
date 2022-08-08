const express     = require('express');
const router      = express.Router();
const bodyParser  = require('body-parser');
const TicketModel = require('../../models/ticket');
const GroupModel  = require('../../models/group');
const midds       = require('../../middlewares/general_utils');

var urlencodedParser = bodyParser.urlencoded({ limit: '10mb', extended: false });

router.post('/single', urlencodedParser, async (req, res) => {
	let error          = false;
	let ticket_data    = req.body;
	let last_ticket    = await TicketModel.find().sort({_id:-1}).limit(1).catch((err) => { error = [err]; });
	let new_group_name = ticket_data.new_group;

	// If New Group Was Provided, Then Check If Exists (If No, New ID Given) And Add It 
	if ( new_group_name ) { // PASS THIS TO MIDDLEWARE LATER midds.add_new_group_to_ticket_and_to_database
		let group_provided = await GroupModel.findOne({ name: new_group_name }).select().catch((err) => { error = error ? error.push(err) : [err]; });
		let new_group_id   = null;
		
		if ( group_provided ) { // If New Provided Group Already Exists
			new_group_id = group_provided.id; 
		} else { 
			let last_group = await GroupModel.find().sort({_id:-1}).limit(1).catch((err) => { error = error ? error.push(err) : [err]; });
			new_group_id   = last_group[0].id + 1;
			await new GroupModel({ // SEPARATE THIS IN ANOTHER FUNC IN MIDDS
				name:         new_group_name,
				id:           new_group_id,
				creator_name: req.session.user.name,
				creator:      req.session.user.id,
				tickets:      [] // HAS TO BE UPDATED LATER, IF TICKET IS SUCCESSFULY CREATED
			}).save().catch((err) => { error = error ? error.push(err) : [err]; });
		}

		ticket_data.groups.push(new_group_id);
		ticket_data.groups_names.push(new_group_name);
	}
	console.log(ticket_data);
return res.send("GUT");
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

	await newTicketDocument.save().catch((err) => { error = error ? error.push(err) : [err]; });
	// IF NO ERROR, UPDATE TICKET GROUP (PUTS TICKET ID TO ITS TICKETS ARRAY)
	res.send(midds.generate_response_object(error, newTicketDocument, req.originalUrl));
});

module.exports = router;