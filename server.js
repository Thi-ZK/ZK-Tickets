const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const PORT = process.env.PORT || 3001;
const DB_URI = process.env.DB_URI;

app.use(cors());
app.use(express.json());

mongoose.connect(DB_URI)
    .then( () => { app.listen( PORT, () => { console.log(`Server Running On ${PORT}`); }); })
    .catch( (error) => { console.log(error); } );