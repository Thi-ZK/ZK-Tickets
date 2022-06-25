const express = require('express');
const router = express.Router();

router.post('/auth', async (req, res) => {
	let data = req.body;
    console.log(data);
	
	res.end("goody");
});

module.exports = router;