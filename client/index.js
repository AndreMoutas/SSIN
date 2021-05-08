const registration = require("./authentication");
const axios = require("axios");

// Create app
const express = require("express");
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Adds Authorization header automatically
function SetAutomaticHeader(username) {
    axios.interceptors.request.use(
        request => {
            const userJSONData = require(`./users/${username}.json`);
            if (userJSONData)
                request.headers['Authorization'] = `Bearer ${userJSONData.token}`;
            return request;
        },
        error => {
            return Promise.reject(error);
        }
    )
}

async function RequestSqrt() {
    const result = await axios.get("http://localhost:3000/sqrt", {
        params: { number: 100 },
    });

    console.log(result.data);
}

async function RequestCbrt() {
    const result = await axios.get("http://localhost:3000/cbrt", {
        params: { number: 27 }
    });

    console.log(result.data);
}

async function RequestNrt() {
    const result = await axios.get("http://localhost:3000/nrt", {
        params: { number: 32, root: 5 }
    });

    console.log(result.data);
}

app.post("/message",async (req,res) => {
    console.log(req.body);
    
    try {
        return res.status(200);
    }
    catch (err) {
        console.error(err)
        return res.status(401).json(err.message);
    }
})

const port = process.argv[2];

app.listen(port, async () => {
    console.log(`Client running on ${process.env.NODE_ENV} mode, at port ${port}.`)
})

var stdin = process.openStdin();

stdin.addListener("data", function(input) {
    let inputArray = input.toString().trim().split(" ");
    switch(inputArray[0]) {
        case "register":
            register(inputArray[1], inputArray[2], inputArray[3]);
            break;
        case "login":
            login(inputArray[1], inputArray[2]); 
            break;
        case "message":
            sendMessage(inputArray[1], inputArray.slice(2).join(' '));
            break;
    }
});

function register(username, oneTimeID, password) {
    registration.Register(username, oneTimeID, password);
    SetAutomaticHeader(username);
}
function login(username, password) {
    registration.Login(username, password, port);
}

async function sendMessage(receiver, message) {
    // Request server for client information
    let result;
    try {
        result = await axios.post("http://localhost:3000/clientInfo", {
        username: receiver
    });
    } catch (error) {
        console.error(error);
    }

    if (result.status != 200) {
        console.error("Request failed!"); 
        return;
    }
    
    let clientInfo = result.data.clientInfo;

    console.log(clientInfo);
    
    // Message the other client directly
    await axios.post(`http://${clientInfo}/message`, {
        text: message 
    });
}

// register William obxV4VtyMl0F epic9000
// register JohnSmi YGGeRiW2j7uj epic
// login William epic9000
// login JohnSmi epic