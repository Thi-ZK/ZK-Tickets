const express    = require('express');
const cors       = require('cors');
const session    = require('express-session');
const mongoose   = require('mongoose');
const MongoStore = require('connect-mongo');
const path       = require('path');
const midds      = require('./routes_aux/general_utils');

// Getting Routes
const ticketDeleteRouter = require('./routes/tickets/delete');
const ticketUpdateRouter = require('./routes/tickets/update');
const ticketCreateRouter = require('./routes/tickets/create');
const ticketGetRouter    = require('./routes/tickets/get');
const userGetRouter      = require('./routes/users/get');
const userUpdateRouter   = require('./routes/users/update');
const GroupGetRouter     = require('./routes/ticket_groups/get');    // Ticket Group
const GroupUpdateRouter  = require('./routes/ticket_groups/update'); // Ticket Group
const loginAuthRouter    = require('./routes/login');

const app = express();

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

// When Client Page Is Visited, Client Must Be Serverd Instead Of A Standard Server Route
// app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(express.static(path.join(__dirname, 'client', 'build')));

// Declaration Of Enviroment Variables
const PORT   = process.env.PORT;
const DB_URI = process.env.DB_URI;

// Session Store Configuration Creation
const sessionStore = MongoStore.create({
    mongoUrl:    DB_URI,
    collection: 'sessions'
});

// Middlewares For Structure / Infra
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors({
    origin:      ["http://localhost:3000", "https://zktickets.herokuapp.com"],
    method:      ["GET", "POST"],
    credentials: true
}));

// Session Configurations Settage
app.use(session({
    secret:            process.env.SESSION_SECRET,
    resave:            false,
    saveUninitialized: false,
    store:             sessionStore,
    cookie:            { maxAge: 1000 * 60 * 60 * 24 * 2 } // Two Days
}));

// Middleware To Restrict User Access To Content Unless He / She Is Logged In
app.use((req, res, next) => {
    if (req.path === "/login/auth") { return next(); }
    !req.session.user ? res.send(midds.generate_response_object("Not Authenticated", null, req.path)) : next();
});

// Routes
app.use('/tickets/delete', ticketDeleteRouter);
app.use('/tickets/update', ticketUpdateRouter);
app.use('/tickets/create', ticketCreateRouter);
app.use('/tickets/get', ticketGetRouter);
app.use('/users/get', userGetRouter);
app.use('/users/update', userUpdateRouter);
app.use('/ticket_groups/get', GroupGetRouter);
app.use('/ticket_groups/get', GroupUpdateRouter);
app.use('/login', loginAuthRouter);

// Server Start After Successful Connection With DB
mongoose.connect(DB_URI)
    .then( () => { app.listen( PORT, () => { console.log(`Server Running On ${PORT}`); }); })
    .catch( (error) => { console.log(error); } );