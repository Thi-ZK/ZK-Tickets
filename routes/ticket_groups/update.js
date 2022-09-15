const express    = require('express');
const GroupModel = require('../../models/user');
const router     = express.Router();
const AF         = require('../../routes_aux/general_utils'); // AF => Generic Aux Functions

// Update Tickets Related To Group Array ("tickets" Key In Ticket Group In DB)
router.post('/single/tickets/add', async (req, res) => {
    let ticket_id = Number(req.body.ticket_id);
    let group_id  = Number(req.body.group_id);
    let error     = false;

    await GroupModel.updateOne({ id: group_id }, { $addToSet: { tickets: ticket_id }}).catch((err) => { error = err; });
    
	res.send(AF.generate_response_object(error, req.body, req.originalUrl));
});

module.exports = router;