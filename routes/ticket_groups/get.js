const express    = require('express');
const GroupModel = require('../../models/ticket_group');
const router     = express.Router();
const AF         = require('../../routes_aux/general_utils');     // AF   => Generic Aux Functions
const R_AF       = require('../../routes_aux/ticket_groups/get'); // R_AF => Route   Aux Functions (For This Specific Route)

// Get All Ticket Groups
router.get('/all', async (req, res) => {
	let error              = false;
	let all_tickets_groups = await GroupModel.find().catch((err) => { error = err; });

	res.send(AF.generate_response_object(error, all_tickets_groups, req.originalUrl));
});

// Get All Ticket Groups Names With IDs (Object)
router.get('/piece/all_groups', async (req, res) => {
	let all_ticket_groups            = await GroupModel.find();
	let ticket_groups_names_with_ids = R_AF.generate_groups_names_with_ids_obj(all_ticket_groups);

	res.send(AF.generate_response_object(false, ticket_groups_names_with_ids, req.originalUrl));
});

module.exports = router;