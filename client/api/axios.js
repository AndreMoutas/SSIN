const https = require("https");
const fs = require("fs");


const axios = require("axios").create({
    httpsAgent: new https.Agent({
        ca: fs.readFileSync('certs/trustedserver.crt'),
        keepAlive: false,
        rejectUnauthorized: false,
    })
});

module.exports = axios