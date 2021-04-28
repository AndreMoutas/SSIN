// Copy from .env
const dotenv = require("dotenv");
dotenv.config();

// Create app
const express = require("express");
const app = express();

// Connect to database
const db = require("./database/index");

// Body parser middleware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const preRegistration = require("./services/pre-registration");
const operations = require("./services/operations");
const authentication = require("./services/authentication");

/*
// Setup session and passport
// Se calhar não vamos precisar disto afinal
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
    secret: process.env.SESSION_SECRET,
    name: 'sessionId'
}));
app.use(passport.initialize({}));
app.use(passport.session({}));

 */


// Enable logger
const logger = require('morgan');
app.use(logger('dev'));

// Routes
app.get("/sqrt", authentication.authenticateMiddleware, (req, res) => {
    if (req.user.clearanceLevel < 1)
        return res.status(403).json("Not enough clearance level: " + req.user.clearanceLevel)

    const number = req.query.number || 0;
    const opResult = operations.calculateSquareRoot(number);
    return res.status(200).json(opResult);
})

app.get("/cbrt", authentication.authenticateMiddleware, (req, res) => {
    if (req.user.clearanceLevel < 2)
        return res.status(403).json("Not enough clearance level: " + req.user.clearanceLevel)

    const number = req.query.number || 0;
    const opResult = operations.calculateCubitRoot(number);
    return res.status(200).json(opResult);
})

app.get("/nrt", authentication.authenticateMiddleware, (req, res) => {
    if (req.user.clearanceLevel < 3)
        return res.status(403).json("Not enough clearance level: " + req.user.clearanceLevel)

    const number = req.query.number || 0;
    const root = req.query.root || 0;
    const opResult = operations.calculateNRoot(number, root);
    return res.status(200).json(opResult);
})

app.post("/register",async (req,res) => {
    const { username, password, oneTimeId } = req.body;

    try {
        const token = await authentication.register(username, oneTimeId, password);
        return res.status(200).json({ token: token });
    }
    catch (err) {
        console.error(err)
        return res.status(401).json(err.message);
    }
})

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const token = await authentication.login(username, password, req, res); // !
        return res.json({ token: token });
    }
    catch (err) {
        console.error(err)
        return res.status(401).json(err.message);
    }
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


app.listen(port, async () => {
    console.log(`App running on ${process.env.NODE_ENV} mode, at port ${port}.`)
    await db.connect();
    // await db.reset();
    // await store.sync();

    // preRegistration.addUser("William Smith", 1)
})

var stdin = process.openStdin();

stdin.addListener("data", function(input) {
    let inputArray = input.toString().trim().split(" ");
    if (inputArray[0] == "adduser") {
        if (inputArray.length < 3) {
            console.error("Usage: adduser <Name> [Name]* <clearance_level>");
            return;
        }
        let name = "";
        for (let i = 1; i < inputArray.length - 1; ++i) {
            name += inputArray[i] + " ";
        }
        name = name.substr(0, name.length-1);
        try {
            preRegistration.addUser(name, parseInt(inputArray[inputArray.length-1]));
        } catch (error) {
            console.error("Clearance level must be an integer!");
        }
    }
});