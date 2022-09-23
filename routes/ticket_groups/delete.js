const express    = require('express');
const GroupModel = require('../../models/ticket_group');
const router     = express.Router();
const AF         = require('../../routes_aux/general_utils'); // AF   => Generic Aux Functions

// Get All Ticket Groups
router.post('/', async (req, res) => {
	let error              = false;
	// let all_tickets_groups = await GroupModel.find().catch((err) => { error = err; });

    await new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 1500);
    })

	res.send(AF.generate_response_object(error, "", req.originalUrl));
});

module.exports = router;