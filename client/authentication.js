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

    // todo: guardar token
    // encriptar e guardar a password em json + guardar username
    console.log(hashPassword(password));
    let user = {
        username: username,
        passwordDigest: await hashPassword(password)
    }
    fs.writeFileSync('user.json', JSON.stringify(user));
 }

async function Login(password){
    // verificar se passe encriptada é igual ao json
    let jsonData = require('./user.json');
    console.log(jsonData);
    if(jsonData.username == null || !checkPassword(password,jsonData.password))
        boom;

    // mandar pedido
    const result = await axios.post("http://localhost:3000/login",{
        username: jsonData.username,
        password: password,

    })

    // todo: guardar token
}

//todo: fazer uma cena que mete o token em tds os pedidos (http interceptor?)

module.exports = {Register, Login}