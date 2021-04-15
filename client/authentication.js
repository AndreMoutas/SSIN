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
    fs.writeFileSync('user.json', JSON.stringify(user));
 }

async function Login(password) {
    // verificar se passe encriptada é igual ao json
    let jsonData = require('./user.json');
    console.log(jsonData);

    if (!jsonData || jsonData.username == null || !await checkPassword(password, jsonData.passwordDigest)) // local authentication
        return console.error("Wrong password");

    // mandar pedido
    const result = await axios.post("http://localhost:3000/login",{
        username: jsonData.username,
        password: password,

    })

    console.log(result.data)

    jsonData.token = result.data.token

    fs.writeFileSync('user.json', JSON.stringify(jsonData));
}

module.exports = {Register, Login}