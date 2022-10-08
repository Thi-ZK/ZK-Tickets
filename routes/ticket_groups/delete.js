const express     = require('express');
const GroupModel  = require('../../models/ticket_group');
const TicketModel = require('../../models/ticket');
const router      = express.Router();
const AF          = require('../../routes_aux/general_utils'); // AF => Generic Aux Functions
const midds       = require('../../middlewares/ticket_groups/general');

// Delete All Provided Ticket Groups
router.post('/multiple', midds.check_user_legitimacy_max_strict, async (req, res) => {
	let error                = false;
    let groups_to_be_deleted = req.body.groups_to_be_deleted;

    // Updating Tickets (Removing Groups From Tickets)
    groups_to_be_deleted.forEach( async (group) => {
        let tickets_related_to_current_group = group.tickets;
        
        tickets_related_to_current_group.forEach( async (ticket_id) => {
            await TicketModel.updateOne({ id: ticket_id }, { $pull: {
                groups:       group.id,
                groups_names: group.name
            }}).catch((err) => { error = err; });
        });
    });

    // Deleting All Groups
    groups_to_be_deleted.forEach( async (group) => {
        await GroupModel.deleteOne({ id: Number(group.id) }).catch((err) => { error = err; });
    });

	res.send(AF.generate_response_object(error, groups_to_be_deleted, req.originalUrl));
});

module.exports = router;