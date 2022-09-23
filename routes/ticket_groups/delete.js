const express     = require('express');
const GroupModel  = require('../../models/ticket_group');
const router      = express.Router();
const AF          = require('../../routes_aux/general_utils'); // AF   => Generic Aux Functions

// Delete All Provided Ticket Groups
router.post('/', async (req, res) => {
	let error                = false;
    let groups_to_be_deleted = req.body.groups_to_be_deleted;

    groups_to_be_deleted.forEach(async (group) => {
        await GroupModel.deleteOne({ id: Number(group.id) }).catch((err) => { error = err; });
    })

	res.send(AF.generate_response_object(error, "", req.originalUrl));
});

module.exports = router;