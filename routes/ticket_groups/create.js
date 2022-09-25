const express    = require('express');
const GroupModel = require('../../models/ticket_group');
const router     = express.Router();
const AF         = require('../../routes_aux/general_utils'); // AF => Generic Aux Functions

router.post('/', async (req, res) => {
	let error          = false;
	let new_group_name = req.body;
    // console.log(new_group_name);
    return res.send({success:true});
	// let last_group_id  = await R_AF.get_last_group_id(GroupModel);

	const new_group_document = new GroupModel({
		name:                    new_group_name.name,
		id:                      last_group_id + 1,
		creation_date:           new Date(),
		last_status_update_date: new Date()
	});

	await new_group_document.save().catch((err) => { error = err; });
	
	res.send(AF.generate_response_object(error, new_group_document, req.originalUrl));
});

module.exports = router;