const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ limit: '10mb', extended: false });

router.get('/update', urlencodedParser, (req, res) => {
	
});

router.get('/delete', urlencodedParser, (req, res) => {
	
});

module.exports = router;