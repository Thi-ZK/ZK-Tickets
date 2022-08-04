const express     = require('express');
const router      = express.Router();
const bodyParser  = require('body-parser');
const TicketModel = require('../../models/ticket');
const midds       = require('../../middlewares/general_utils');

var urlencodedParser = bodyParser.urlencoded({ limit: '10mb', extended: false });

router.get('/single/:ticket_id', urlencodedParser, async (req, res) => {
	let ticket_id = Number(req.params.ticket_id);
	let error     = false;
	
	await TicketModel.deleteOne({id: ticket_id}).catch((error) => { error = error; });

	res.send(midds.generate_response_object(error, ticket_id, "Delete Single Ticket"));
});

module.exports = router;