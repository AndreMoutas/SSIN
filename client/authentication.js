const axios = require("axios");
const fs = require('fs');
const bcrypt = require("bcrypt");


function hashPassword(password, salt = 13) {
    return bcrypt.hash(password, salt);
}


function checkPassword(password, passwordDigest) {
    return bcrypt.compare(password, passwordDigest);
}


async function Register(username, oneTimeId, password) {

    const result = await axios.post("http://localhost:3000/register", {
        username: username,
        oneTimeId: oneTimeId,
        password: password
    });

    const token = result.data.token;

    // encriptar e guardar a password em json + guardar username
    let user = {
        username: username,
        passwordDigest: await hashPassword(password),
        token: token
    }
    console.log(user);
    let filePath = "./users/" + username + ".json";
    fs.writeFileSync(filePath, JSON.stringify(user));
}

async function Login(username, password, sender) {
    // verificar se passe encriptada é igual ao json
    let filePath = "./users/" + username + ".json";
    let jsonData = require(filePath);
    console.log(jsonData);

    if (!jsonData || jsonData.username == null || !await checkPassword(password, jsonData.passwordDigest)) // local authentication
        return console.error("Wrong password");

    // mandar pedido
    const result = await axios.post("http://localhost:3000/login", {
        username: jsonData.username,
        password: password,
        sender: sender
    })

    console.log(result.data);
    jsonData.token = result.data.token;
    fs.writeFileSync(filePath, JSON.stringify(jsonData));
}

module.exports = { Register, Login }