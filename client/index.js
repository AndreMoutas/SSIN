const registration = require("./authentication");
const axios = require("axios");

// Create app
const express = require("express");
const app = express();

// Adds Authorization header automatically
axios.interceptors.request.use(
    request => {
        const userJSONData = require('./user.json');
        if (userJSONData)
            request.headers['Authorization'] = `Bearer ${userJSONData.token}`
        return request;
    },
    error => {
        return Promise.reject(error)
    }
)

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
    //const { content } = req.body;

    try {
        //console.log("Content: " + content);
        return res.status(200).json({ token: "ola"});
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
            login(inputArray[1]); 
            break;
        case "message":
            sendMessage(inputArray[1]);
            break;
    }
});

function register(username, oneTimeID, password) {
    registration.Register(username, oneTimeID, password);
}
function login(password) {
    registration.Login(password);
}

async function sendMessage(receiver) {
    const result = await axios.post("http://localhost:3001/message", {
        text: "ping" 
    });
}

//RequestSqrt();
//RequestCbrt();
// RequestNrt();


//registration.Register('William','obxV4VtyMl0F','epic9000');
//registration.Register('JohnSmi','3Vl2lUGwB7Wm','epic9000');
// registration.Login('epic9000');
// William obxV4VtyMl0F epic9000
// JohnSmi 3Vl2lUGwB7Wm epic9000