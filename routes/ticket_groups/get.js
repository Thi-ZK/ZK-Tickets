const express    = require('express');
const GroupModel = require('../../models/ticket_group');
const router     = express.Router();
const AF         = require('../../routes_aux/general_utils');     // AF   => Generic Aux Functions
const R_AF       = require('../../routes_aux/ticket_groups/get'); // R_AF => Route   Aux Functions (For This Specific Route)

// Get All Ticket Groups
router.get('/all', async (req, res) => {
	let error              = false;
	let all_ticket_groups = await GroupModel.find().catch((err) => { error = err; });

	res.send(AF.generate_response_object(error, all_ticket_groups, req.originalUrl));
});

module.exports = router;