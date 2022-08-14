const express     = require('express');
const router      = express.Router();
const bodyParser  = require('body-parser');
const TicketModel = require('../../models/ticket');
const midds       = require('../../middlewares/general_utils'); 

var urlencodedParser = bodyParser.urlencoded({ limit: '10mb', extended: false });

// NEW MESSAGE - Meant For Setting A New Message For A Single Ticket
router.post('/single/messages/set', urlencodedParser, async (req, res) => {
	let ticket_id  = req.body.ticket_id;
	let error      = false; 

	let new_message = {
		message:            req.body.message,
		date:               new Date(),
		date_casual_format: Date(),
		id:                 req.body.message_id || midds.generate_random_id(),
		message_owner:      req.session.user.id,
		message_owner_name: req.session.user.name,
		status: "alive"
	}

	await TicketModel.updateOne({ id: ticket_id}, {$push: {messages: new_message} }).catch((err) => { error = err; });

	res.send(midds.generate_response_object(error, new_message, req.originalUrl));
});

// DELETING MESSAGE - Meant For Deleting A Message For A Single Ticket
router.post('/single/messages/delete/', urlencodedParser, async (req, res) => {
	let ticket_id     = req.body.ticket_id;
	let message_id    = req.body.message_id;
	let message_owner = req.body.message_owner;
	let error         = false;

	if (!(message_owner === req.session.user.id) && (req.session.user.user_power <= 3)) { // Middleware Later
		return res.send("Not Allowed");
	}

	await TicketModel.findOneAndUpdate({
		id: ticket_id,
		'messages.id': message_id
	}, {'messages.$.status': "deleted"}).catch((err) => { error = err; });

	res.send(midds.generate_response_object(error, req.body, req.originalUrl));
});

// NEW TICKET STATUS - Meant For Setting A New Status For A Single Ticket
router.post('/single/status', urlencodedParser, async (req, res) => {
	let ticket_id  = req.body.ticket_id;
	let new_status = req.body.new_status;
	let error      = false;
	
	await TicketModel.updateOne({ id: ticket_id }, { last_status_update_date: new Date(), status: new_status})
	.catch((err) => { error = err; });
	
	res.send(midds.generate_response_object(error, req.body, req.originalUrl));
});

// NEW USER ASSIGNED - Meant For Setting A New Assigned User For A Single Ticket
router.post('/single/assigneds/set', urlencodedParser, async (req, res) => {
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
	
	res.send(midds.generate_response_object(error, req.body, req.originalUrl));
});

// REMOVING ASSIGNED USER - Meant For Deleting A Assigned User For A Single Ticket
router.post('/single/assigneds/delete', urlencodedParser, async (req, res) => {
	let ticket_id           = req.body.ticket_id;
	let assumer         = req.body.aggregative_id;
	let assumer_name    = req.body.aggregative_name;
	let ticket_creator      = req.body.ticket_creator;
	let ticket_creator_name = req.body.ticket_creator_name;
	let error               = false;

	// If User Is The Creator Of The Ticket, He/She Is Still Related To The Ticket And Therefore Shouldn't Be Pulled Off From The Array Of Related Users.
	await TicketModel.updateOne({ id: ticket_id }, {
		$pull: {
			assumers:            assumer,
			assumers_names:      assumer_name,
			related_users:       ticket_creator === assumer ? undefined : assumer,
			related_users_names: ticket_creator_name === assumer_name ? undefined : assumer_name,
		}}).catch((err) => { error = err; });

	res.send(midds.generate_response_object(error, req.body, req.originalUrl));
});

module.exports = router;