const express     = require('express');
const router      = express.Router();
const bodyParser  = require('body-parser');
const GroupModel  = require('../../models/user');
const midds       = require('../../middlewares/general_utils');

let urlencodedParser = bodyParser.urlencoded( { limit: '10mb', extended: false } );

// Update Tickets Related To Group Array ("tickets" Key In Ticket Group In DB)
router.post('/single/tickets/add', urlencodedParser, async (req, res) => {
    let ticket_id = Number(req.body.ticket_id);
    let group_id  = Number(req.body.group_id);
    let error     = false;

    await GroupModel.updateOne({ id: group_id }, { $addToSet: { tickets: ticket_id }}).catch((error) => { error = error; });
    
	res.send(midds.generate_response_object(error, req.body, req.originalUrl));
});

module.exports = router;