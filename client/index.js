const authentication = require("./api/authentication");
var cors = require("cors");

// Create message server

const express = require("express");
const app = express();
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.argv[2] || 2000;

app.get("/ping", async (req, res) => {
    res.status(200).send();
})

app.get("/", async function(req, res) {
    res.send("API is working properly");
});

app.get("/testAPI", async function(req, res) {
    res.send("API is working properly");
});

app.get("/sqrt", async function(req, res) {
    let result = await roots.RequestSqrt(req.query.number);
    res.send(result.toString());
});

app.get("/cbrt", async function(req, res) {
    let result = await roots.RequestCbrt(req.query.number);
    res.send(result.toString());
});

app.get("/nrt", async function(req, res) {
    let result = await roots.RequestNrt(req.query.number, req.query.root);
    res.send(result.toString());
});

app.post("/login", async function(req, res) {
    const { username, password } = req.body;
    let status = await authentication.Login(username, password, `localhost:${port}`);
    return res.status(status).json();
})

app.post("/register", async function(req, res) {
    const { username, password, oneTimeID } = req.body;
    let status = await authentication.Register(username, password, oneTimeID, `localhost:${port}`);
    return res.status(status).json();
})

app.post("/message",async (req,res) => {
    console.log(req.body);

    authentication.SessionAddMessage(req.body.username, req.body.text)

    return res.status(200).json("Got your message: " + req.body.text);
})

app.listen(port, async () => {
    console.log(`Client running at port ${port}.`)
})


// Create command line
const roots = require("./api/roots");
const messenger = require("./api/messenger");

const stdin = process.openStdin();

stdin.addListener("data", function(input) {
    let inputArray = input.toString().trim().split(" ");

    const [command, ...args] = inputArray;

    const printErrorMessage = (err) => console.error(err.message);

    switch(command) {
        case "sqrt":
            roots.RequestSqrt(inputArray[1]).catch(printErrorMessage);
            break;
        case "cbrt":
            roots.RequestCbrt(inputArray[1]).catch(printErrorMessage);
            break;
        case "nrt":
            roots.RequestNrt(inputArray[1], inputArray[2]).catch(printErrorMessage);
            break;
        case "register":
            authentication.Register(inputArray[1], inputArray[2], inputArray[3], `localhost:${port}`).catch(printErrorMessage);
            break;
        case "login":
            authentication.Login(inputArray[1], inputArray[2], `localhost:${port}`).catch(printErrorMessage);
            break;
        case "message":
            messenger.send(inputArray[1], inputArray.slice(2).join(' ')).catch(printErrorMessage);
            break;
        case "displaymessages":
            messenger.displayAll();
            break;
        default:
            console.error("Unknown command: " + command)
            break;
    }
});
