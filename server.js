const express    = require('express');
const cors       = require('cors');
const session    = require('express-session');
const mongoose   = require('mongoose');
const MongoStore = require('connect-mongo');
const path       = require('path');
const midds      = require('./middlewares/server.js');
const AF         = require('./routes_aux/general_utils'); // AF => Aux Functions

// Getting Routes
const ticketDeleteRouter = require('./routes/tickets/delete');
const ticketUpdateRouter = require('./routes/tickets/update');
const ticketCreateRouter = require('./routes/tickets/create');
const ticketGetRouter    = require('./routes/tickets/get');
const userGetRouter      = require('./routes/users/get');
const userUpdateRouter   = require('./routes/users/update');
const groupGetRouter     = require('./routes/ticket_groups/get');
const groupUpdateRouter  = require('./routes/ticket_groups/update');
const loginAuthRouter    = require('./routes/login');

const app = express();
const IRL = process.env.NODE_ENV !== 'production'; // IRL Is An Alias For => Is Running Locally?

// Load Enviroment Variables & Resources In Case Not Production (Running On Localhost)
if ( IRL ) {
	require('dotenv').config();
}

// Declaration Of Enviroment Variables
const PORT   = process.env.PORT;
const DB_URI = process.env.DB_URI;

// Session Store Configuration Creation
const sessionStore = MongoStore.create({
    mongoUrl:    DB_URI,
    collection: 'sessions'
});

// Middlewares For Structure / Infra
app.use(express.static(path.join(__dirname, 'client', 'build'))); // Meant For Client Serving
app.use(express.urlencoded({ extended: false, limit: "2mb" }));
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
app.use(midds.check_user_logged_state_and_restrict_access_if_not_logged_in);

// Routes
app.use('/tickets/delete',    ticketDeleteRouter);
app.use('/tickets/update',    ticketUpdateRouter);
app.use('/tickets/create',    ticketCreateRouter);
app.use('/tickets/get',       ticketGetRouter);
app.use('/users/get',         userGetRouter);
app.use('/users/update',      userUpdateRouter);
app.use('/ticket_groups/get', groupGetRouter);
app.use('/ticket_groups/get', groupUpdateRouter);
app.use('/login',             loginAuthRouter);

// Serving All Pages From Client
if ( !IRL ) {
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

// Server Start After Successful Connection With DB
mongoose.connect(DB_URI).then(() => {
    app.listen(PORT, () => { console.log(`Server Running On ${PORT}`);
        AF.prevent_heroku_from_sleeping(29);
    });
}).catch( (error) => { console.log(error); } );