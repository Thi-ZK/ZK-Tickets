const express     = require('express');
const router      = express.Router();
const bodyParser  = require('body-parser');
const GroupModel  = require('../../models/ticket_group');
const midds       = require('../../middlewares/general_utils');

let urlencodedParser = bodyParser.urlencoded( { limit: '10mb', extended: false } );

router.get('/all', urlencodedParser, async (req, res) => {
	let error              = false;
	let all_tickets_groups = await GroupModel.find().catch((err) => { error = err; });

	res.send(midds.generate_response_object(error, all_tickets_groups, req.originalUrl));
});

router.get('/piece/all_groups', urlencodedParser, async (req, res) => {
	let all_ticket_groups            = await GroupModel.find();
	let ticket_groups_names_with_ids = {};

	for (let i = 0; i < all_ticket_groups.length; i++) { // PASS TO MIDS
		ticket_groups_names_with_ids[all_ticket_groups[i].id] = all_ticket_groups[i].name;
	}

	res.send(midds.generate_response_object(false, ticket_groups_names_with_ids, req.originalUrl));
});

module.exports = router;