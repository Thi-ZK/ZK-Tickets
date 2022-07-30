const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const TicketModel = require('../../models/ticket');

var urlencodedParser = bodyParser.urlencoded({ limit: '10mb', extended: false });

// NEW MESSAGE - Meant For Setting A New Message For A Single Ticket
router.post('/single/messages/set/:ticket_id', urlencodedParser, async (req, res) => {
	let ticket_id  = req.params.ticket_id;
	let req_status = "Ticket Updated";

	let new_message = {
		message: req.body.message,
		date: new Date(),
		date_casual_format: Date(),
		id: req.body.message_id || String(Date.now()) + "." + String(Math.floor(Math.random() * 100000)),
		message_owner: req.session.user.id,
		message_owner_name: req.session.user.name,
		status: "alive"
	}

	await TicketModel.updateOne({id: ticket_id}, {$push: {messages: new_message}})
	.catch((error) => {req_status = "Ticket Doesn't Exist"});

	res.end(req_status);
});

// DELETING MESSAGE - Meant For Deleting A Message For A Single Ticket
router.post('/single/messages/delete/:ticket_id/', urlencodedParser, async (req, res) => {
	let ticket_id     = req.params.ticket_id;
	let message_id    = req.body.message_id;
	let message_owner = req.body.message_owner;
	let req_status    = "Ticket Updated";

	if (!(message_owner === req.session.user.id) && (req.session.user.user_power <= 3)) {
		return res.end("Not Allowed");
	}

	await TicketModel.findOneAndUpdate({
		id: ticket_id,
		'messages.id': message_id
	}, {'messages.$.status': "deleted"})
	.catch(() => {req_status = "Ticket Doesn't Exist";});

	res.end(req_status);
});

// NEW TICKET STATUS - Meant For Setting A New Status For A Single Ticket
router.post('/single/status/:ticket_id', urlencodedParser, async (req, res) => {
	let ticket_id  = req.params.ticket_id;
	let new_status = req.body.new_status;
	
	await TicketModel.updateOne({id: ticket_id}, {last_status_update_date: new Date(), status: new_status});
	
	res.end("Ticket Updated");
});

// NEW ASSIGNED - Meant For Setting A New Assigned User For A Single Ticket
router.post('/single/assigneds/set/:ticket_id', urlencodedParser, async (req, res) => {
	let ticket_id        = req.params.ticket_id;
	let new_assumer      = req.body.assigne_id;
	let new_assumer_name = req.body.assigned_name;
	let req_status       = "Ticket Updated";

	await TicketModel.updateOne({id: ticket_id}, {
		$addToSet: {
			assumers: new_assumer,
			assumers_names: new_assumer_name,
			related_users: new_assumer,
			related_users_names: new_assumer_name
		}})
	.catch(() => {req_status = "Ticket Doesn't Exist"});
	
	res.end(req_status);
});

// DELETING ASSIGNED - Meant For Deleting A Assigned User For A Single Ticket
router.post('/single/assigneds/delete/:ticket_id', urlencodedParser, async (req, res) => {
	let ticket_id           = req.params.ticket_id;
	let new_assumer         = req.body.assigne_id;
	let new_assumer_name    = req.body.assigned_name;
	let req_status          = "Ticket Updated";
	let ticket_creator      = req.body.ticket_creator;
	let ticket_creator_name = req.body.ticket_creator_name;

	// If User Is The Creator Of The Ticket, He/She Is Still Related To The Ticket And Therefore Shouldn't Be Pulled Off
	// From The Array Of Related Users.
	await TicketModel.updateOne({id: ticket_id}, {
		$pull: {
			assumers: new_assumer,
			assumers_names: new_assumer_name,
			related_users: ticket_creator === new_assumer ? undefined : new_assumer,
			related_users_names: ticket_creator_name === new_assumer_name ? undefined : new_assumer_name,
		}})
	.catch(() => {req_status = "Ticket Doesnt' Exist"});

	res.end(req_status);
});

module.exports = router;