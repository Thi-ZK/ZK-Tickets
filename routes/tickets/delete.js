const express     = require('express');
const TicketModel = require('../../models/ticket');
const router      = express.Router();
const bodyParser  = require('body-parser');
const AF          = require('../../routes_aux/general_utils'); // AF => Aux Functions

var urlencodedParser = bodyParser.urlencoded({ limit: '10mb', extended: false });

router.get('/single/:ticket_id', urlencodedParser, async (req, res) => {
	let ticket_id = Number(req.params.ticket_id);
	let error     = false;
	
	await TicketModel.deleteOne({id: ticket_id}).catch((err) => { error = err; });

	res.send(AF.generate_response_object(error, ticket_id, "Delete Single Ticket"));
});

module.exports = router;