const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const ticketDeleteRouter = require('./routes/tickets/delete');
const ticketUpdateRouter = require('./routes/tickets/update');
const ticketCreateRouter = require('./routes/tickets/create');
const ticketGetRouter = require('./routes/tickets/get');
const loginAuthRouter = require('./routes/login');

const app = express();

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

// Declaration Of Varied Variables
const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;
const sessionStore = MongoStore.create({
    mongoUrl: DB_URI,
    collection: 'sessions'
});

// Middlewares For Structure / Infra
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    method: ["GET", "POST"],
    credentials: true
}));

// Session Configurations Settage
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 1 } // one day 
}));

// Routes
app.use('/tickets/delete', ticketDeleteRouter);
app.use('/tickets/update', ticketUpdateRouter);
app.use('/tickets/create', ticketCreateRouter);
app.use('/tickets/get', ticketGetRouter);
app.use('/login', loginAuthRouter);

// Server Start After Successful Connection With DB
mongoose.connect(DB_URI)
    .then( () => { app.listen( PORT, () => { console.log(`Server Running On ${PORT}`); }); })
    .catch( (error) => { console.log(error); } );