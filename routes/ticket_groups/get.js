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

module.exports = router;