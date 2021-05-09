// Copy from .env
const dotenv = require("dotenv");
dotenv.config();

// Create app
const axios = require("axios");
const fs = require("fs");
const https = require("https");
const express = require("express");
const app = express();
const privateKey  = fs.readFileSync('certs/selfsigned.key', 'utf8');
const certificate = fs.readFileSync('certs/selfsigned.crt', 'utf8');

const httpsServer = https.createServer({
    key: privateKey,
    cert: certificate
}, app);

// Connect to database
const db = require("./database/index");

// Body parser middleware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const preRegistration = require("./services/pre-registration");
const operations = require("./services/operations");
const authentication = require("./services/authentication");

// Enable logger
const logger = require('morgan');
app.use(logger('dev'));

// Routes
app.get("/sqrt", authentication.authenticateMiddleware, authentication.minClearance(1), (req, res) => {
    const opResult = operations.calculateSquareRoot(req.query.number || 0);
    return res.status(200).json(opResult);
})

app.get("/cbrt", authentication.authenticateMiddleware, authentication.minClearance(2), (req, res) => {
    const opResult = operations.calculateCubitRoot(req.query.number || 0);
    return res.status(200).json(opResult);
})

app.get("/nrt", authentication.authenticateMiddleware, authentication.minClearance(3), (req, res) => {
    const opResult = operations.calculateNRoot(req.query.number || 0, req.query.root || 0);
    return res.status(200).json(opResult);
})

app.post("/register", async (req, res) => {
    const { username, password, oneTimeId, endpoint } = req.body;

    try {
        const token = await authentication.register(username, oneTimeId, password, endpoint);
        return res.status(200).json({ token: token });
    }
    catch (err) {
        console.error(err)
        return res.status(401).json(err.message);
    }
})


app.post("/login", async (req, res) => {
    const { username, password, endpoint } = req.body;
    try {
        const token = await authentication.login(username, password, endpoint, req, res); // !
        return res.json({ token: token });
    }
    catch (err) {
        console.error(err)
        return res.status(401).json(err.message);
    }
})


app.get("/clientInfo", authentication.authenticateMiddleware, authentication.minClearance(1), async (req, res) => {
    const { username } = req.query;

    try {
        const user = await db.User.findOne({ where: { username } });
        const endpoint = (user || {}).endpoint;

        await axios.get(`http://${endpoint}/ping`);

        return res.status(200).json({ endpoint: endpoint });
    }
    catch (err) {
        return res.status(200).json(null);
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

httpsServer.listen(port, async () => {
    console.log(`Server running on ${process.env.NODE_ENV} mode, at port ${port}.`)

    console.log((await db.User.findAll()).map(user => user.toJSON()))
    await db.connect();
  // await db.reset();

})


// Command line
const stdin = process.openStdin();

stdin.addListener("data", function (input) {
    let inputArray = input.toString().trim().split(" ");
    if (inputArray[0] === "adduser") {
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