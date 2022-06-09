const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const trashRouter = require('./routes/trash_for_test');

const ticketDeleteRouter = require('./routes/tickets/delete');
const ticketUpdateRouter = require('./routes/tickets/update');
const ticketCreateRouter = require('./routes/tickets/create');
const ticketGetRouter = require('./routes/tickets/get');

const app = express();

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const PORT = process.env.PORT || 3001;
const DB_URI = process.env.DB_URI;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.end("Home");
});

app.use('/trash_for_test', trashRouter);

app.use('/tickets/delete', ticketDeleteRouter);
app.use('/tickets/update', ticketUpdateRouter);
app.use('/tickets/create', ticketCreateRouter);
app.use('/tickets/get', ticketGetRouter);

mongoose.connect(DB_URI)
    .then( () => { app.listen( PORT, () => { console.log(`Server Running On ${PORT}`); }); })
    .catch( (error) => { console.log(error); } );