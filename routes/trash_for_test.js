const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ limit: '10mb', extended: false });

router.get('/', urlencodedParser, (req, res) => {
	res.end("Test");
});

module.exports = router;