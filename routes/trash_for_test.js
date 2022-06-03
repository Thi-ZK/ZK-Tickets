const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Trash = require('../models/trash_for_test');

var urlencodedParser = bodyParser.urlencoded({ limit: '10mb', extended: false });

router.get('/', urlencodedParser, (req, res) => {
	Trash.find().then( (data) => {
		res.end(data);
	}).catch((error) => {
		res.end(JSON.stringify(error));
	});


	// const new_trash = new Trash({
	// 	field1: [
	// 		"aa",
	// 		"bb"
	// 	],
	// 	field2: {
	// 		a: "test",
	// 		b: "test"
	// 	},
	// 	field3: "testtt",
	// 	field4: 33
	// });

	// new_trash.save().then((data) => {
	// 	res.end("Ticket Successfully Created" + " \/ \n\n" + data);
	// }).catch(() => {
	// 	res.end("Action Unsuccessful");
	// });
});

module.exports = router;