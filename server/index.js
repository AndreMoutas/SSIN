// Copy from .env
const dotenv = require("dotenv");
dotenv.config();

// Create app
const express = require("express");
const app = express();

// Connect to database
const db = require("./database/index");
db.connect();
// db.reset();

// Body parser middleware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Setup session and passport (Poderá ser preciso no futuro)
/*
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const passport = require('passport')

const store = new SequelizeStore({
    db: db.sequelize,
    checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
    expiration: 24 * 60 * 60 * 1000  // The maximum age (in milliseconds) of a valid session.
});
app.use(session({
    store: store,
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_COOKIE_SECRET,
    name: 'sessionId'
}));
app.use(passport.initialize({}));
app.use(passport.session({}));
store.sync();
*/


// Enable logger
const logger = require('morgan');
app.use(logger('dev'));

// Routes
app.get("/sqrt", (req, res) => {
    const number = req.query.number || 0;
    const sqrt = Math.sqrt(number);
    return res.status(200).json(sqrt);
})

// Error handler
app.use(function (err, req, res, next) {
    console.log(err)
    if (res.headersSent)
        return next(err)
    res.status(err.statusCode || 500).json(err);
})

// Run the app
const port = process.env.APP_PORT || 3001;

app.listen(port, () => {
  console.log(`App running on ${process.env.NODE_ENV} mode, at port ${port}.`)
})