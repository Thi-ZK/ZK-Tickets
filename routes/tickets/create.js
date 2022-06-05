const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const TicketModel = require('../../models/ticket');

var urlencodedParser = bodyParser.urlencoded({ limit: '10mb', extended: false });

router.post('/single', urlencodedParser, (req, res) => {
	let ticket_data = req.body;
	return res.end(ticket_data);

	const newTicketDocument = new TicketModel({
		name: "Fastshop - Implementation FB Pixel",
		id: 2,
		related_users: [1, 2, 4],
		groups: [3, 6],
		description: "We have to implement Pagevies and DPA tracking for them. The pixel is: 320948324848. Please don't forget first pageviewloss prevention.",
		creator: 1,
		status: "Low",
		assumers: [1, 2, 3],
		creation_date: Date(),
		due_date: "Fri Jun 14 2022 12:16:57 GMT-0300 (Brasilia Standard Time)",
		priority: "Urgent!",
		attachments: [],
		messages: [
			{
				user: 2,
				message: "I already implemented, I wish to require homologation for it.",
				date: "Fri Jun 8 2022 12:16:57 GMT-0300 (Brasilia Standard Time)"
			},
			{
				user: 1,
				message: "Very good, I give permission for you to do such.",
				date: "Fri Jun 9 2022 12:16:57 GMT-0300 (Brasilia Standard Time)"
			}
		]
	});

	newTicketDocument.save().then(() => {
		res.end("Ticket Successfully Created");
	}).catch(() => {
		res.end("Action Unsuccessful");
	});
});

module.exports = router;