const express     = require('express');
const TicketModel = require('../../models/ticket');
const GroupModel  = require('../../models/ticket_group');
const router      = express.Router();
const AF          = require('../../routes_aux/general_utils'); // AF => Generic Aux Functions
const midds       = require('../../middlewares/tickets/update');

// NEW MESSAGE - Meant For Setting A New Message For A Single Ticket
router.post('/single/messages/set', async (req, res) => {
	let ticket_id  = req.body.ticket_id;
	let error      = false; 

	let new_message = {
		message:            req.body.message,
		date:               new Date(),
		date_casual_format: Date(),
		id:                 req.body.message_id || AF.generate_random_id(),
		message_owner:      req.session.user.id,
		message_owner_name: req.session.user.name,
		status:             "alive"
	}

	await TicketModel.updateOne({ id: ticket_id }, { $push: {messages: new_message} }).catch((err) => { error = err; });

	res.send(AF.generate_response_object(error, new_message, req.originalUrl));
});

// DELETING MESSAGE - Meant For Deleting A Message For A Single Ticket
router.post('/single/messages/delete/', midds.check_user_legitimacy_strict, async (req, res) => {
	let ticket_id  = req.body.ticket_id;
	let message_id = req.body.message_id;
	let error      = false;

	await TicketModel.findOneAndUpdate({
		id:            ticket_id,
		'messages.id': message_id
	}, { 'messages.$.status': "deleted" }).catch((err) => { error = err; });

	res.send(AF.generate_response_object(error, req.body, req.originalUrl));
});

// NEW TICKET STATUS - Meant For Setting A New Status For A Single Ticket
router.post('/single/status', midds.check_user_legitimacy, async (req, res) => {
	let ticket_id  = req.body.ticket_id;
	let new_status = req.body.new_status;
	let error      = false;
	
	await TicketModel.updateOne({ id: ticket_id }, { last_status_update_date: new Date(), status: new_status}).catch((err) => { error = err; });
	
	res.send(AF.generate_response_object(error, req.body, req.originalUrl));
});

// NEW USER ASSIGNED - Meant For Setting A New Assigned User For A Single Ticket
router.post('/single/assigneds/set', midds.check_user_legitimacy_max_strict, async (req, res) => {
	let ticket_id        = req.body.ticket_id;
	let new_assumer      = req.body.aggregative_id;
	let new_assumer_name = req.body.aggregative_name;
	let error            = false;

	await TicketModel.updateOne({ id: ticket_id }, {
		$addToSet: {
			assumers:            new_assumer,
			assumers_names:      new_assumer_name,
			related_users:       new_assumer,
			related_users_names: new_assumer_name
		}}).catch((err) => { error = err; });
	
	res.send(AF.generate_response_object(error, req.body, req.originalUrl));
});

// REMOVING ASSIGNED USER - Meant For Deleting A Assigned User For A Single Ticket
router.post('/single/assigneds/delete', midds.check_user_legitimacy_strict, async (req, res) => {
	let ticket_id           = req.body.ticket_id;
	let assumer             = req.body.aggregative_id;
	let assumer_name        = req.body.aggregative_name;
	let ticket_creator      = req.body.ticket_creator;
	let ticket_creator_name = req.body.ticket_creator_name;
	let error               = false;

	// If User Is The Creator Of The Ticket, He/She Is Still Related To The Ticket And Therefore Shouldn't Be Pulled Off From The Array Of Related Users.
	await TicketModel.updateOne({ id: ticket_id }, {
		$pull: {
			assumers:            assumer,
			assumers_names:      assumer_name,
			related_users:       ticket_creator      === assumer      ? undefined : assumer,
			related_users_names: ticket_creator_name === assumer_name ? undefined : assumer_name,
		}}).catch((err) => { error = err; });

	res.send(AF.generate_response_object(error, req.body, req.originalUrl));
});

// NEW TICKET GROUP ASSIGNED - Meant For Setting A New Assigned Ticket Group For A Single Ticket
router.post('/single/ticket_groups/set', midds.check_user_legitimacy_max_strict, async (req, res) => {
	let ticket_id       = req.body.ticket_id;
	let new_group       = req.body.aggregative_id;
	let new_group_name  = req.body.aggregative_name;
	let error           = false;

	await TicketModel.updateOne({ id: ticket_id }, {
		$addToSet: {
			groups:       new_group,
			groups_names: new_group_name
		}}).catch((err) => { error = err; });

	await GroupModel.updateOne({ id: new_group }, {
		$addToSet: {
			tickets: ticket_id
		}}).catch((err) => { error = err; });
	
	res.send(AF.generate_response_object(error, req.body, req.originalUrl));
});

// REMOVING ASSIGNED TICKET GROUP - Meant For Deleting An Assigned Ticket Group For A Single Ticket
router.post('/single/ticket_groups/delete', midds.check_user_legitimacy_max_strict, async (req, res) => {
	let ticket_id  = req.body.ticket_id;
	let group      = req.body.aggregative_id;
	let group_name = req.body.aggregative_name;
	let error      = false;

	// If User Is The Creator Of The Ticket, He/She Is Still Related To The Ticket And Therefore Shouldn't Be Pulled Off From The Array Of Related Users.
	await TicketModel.updateOne({ id: ticket_id }, {
		$pull: {
			groups:       group,
			groups_names: group_name
		}}).catch((err) => { error = err; });

	await GroupModel.updateOne({ id: group }, {
		$pull: {
			tickets: ticket_id
		}}).catch((err) => { error = err; });

	res.send(AF.generate_response_object(error, req.body, req.originalUrl));
});

module.exports = router;