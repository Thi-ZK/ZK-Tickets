const express    = require('express');
const GroupModel = require('../../models/ticket_group');
const router     = express.Router();
const AF         = require('../../routes_aux/general_utils'); // AF => Generic Aux Functions
const midds      = require('../../middlewares/ticket_groups/general');

router.post('/single', midds.check_user_legitimacy_no_strict, async (req, res) => {
	let error          = false;
	let new_group_name = req.body.new_group;
	let last_id_group  = await GroupModel.find().sort({_id:-1}).limit(1);

	const new_group_document = new GroupModel({
		name:         new_group_name,
		id:           last_id_group[0].id + 1,
		creator:      req.session.user.id,
		creator_name: req.session.user.name,
		tickets:      []
	});

	await new_group_document.save().catch((err) => { error = err; });
	
	res.send(AF.generate_response_object(error, new_group_document, req.originalUrl));
});

module.exports = router;