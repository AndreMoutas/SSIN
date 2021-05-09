const fs = require('fs');
const axios = require("./axios")
const crypto = require('crypto');

const iv = Buffer.from('00000000000000000000000000000000', 'hex');

function hashPassword(password) {
    return crypto.createHash("sha256").update(password).digest('hex');
}

function encryptWithPassword(text, password) {
    const key = crypto.scryptSync(password, 'salt', 32);
    const cipher = crypto.createCipheriv('aes-256-ctr', key, iv)
    return cipher.update(text,'utf8','base64') + cipher.final('base64');
}

function decryptWithPassword(text, password) {
    const key = crypto.scryptSync(password, 'salt', 32);
    const decipher = crypto.createCipheriv('aes-256-ctr', key, iv)
    return decipher.update(text,'base64','utf-8') + decipher.final('utf-8');

}


exports.Register = async (username, password, oneTimeId, sender) => {
    const result = await axios.post("https://localhost:3000/register", {
        username: username,
        oneTimeId: oneTimeId,
        password: password,
        endpoint: sender
    })

    // Save token encrypted
    createNewSession(username, password, result.data.token);
    SetAutomaticHeader(result.data.token);

    console.log(currentSession)
}

exports.Login = async (username, password, sender) => {
    const decrypted = readSessionFile(username, password)

    if (!decrypted) {
        console.error("Wrong password, could not decrypt user data, performing server login");

        const result = await axios.post("https://localhost:3000/login", {
            username: username,
            password: password,
            endpoint: sender
        })

        createNewSession(username, password, result.data.token);
        SetAutomaticHeader(result.data.token);
    }

    else {
        console.log("Successful local login, here is your session info: ", currentSession)
        SetAutomaticHeader(decrypted.token);
    }
}


function SetAutomaticHeader(token) {
    axios.interceptors.request.use(
        request => {
            request.headers['Authorization'] = `Bearer ${token}`;
            return request;
        },
        error => {
            return Promise.reject(error);
        }
    )
}


// Esta parte podia ir p/ outro ficheiro talvez
// Save messages, and user locations
// Dps disto falta https(?) nas mensagens c/ proof of authorship/non-repudiation
const currentSession = { session: null, hashedPassword: null }

function readSessionFile(username, password) {
    const hashedPassword = hashPassword(password);

    const encrypted = fs.readFileSync("./users/" + username, "base64")
    const decrypted = decryptWithPassword(encrypted, hashedPassword);

    try {
        currentSession.session = JSON.parse(decrypted);
        currentSession.hashedPassword = hashedPassword

        return JSON.parse(decrypted);
    } catch (err) {
        return null;
    }
}

function saveSessionFile() {
    const encrypted = encryptWithPassword(JSON.stringify(currentSession.session), currentSession.hashedPassword);
    fs.writeFileSync("./users/" + currentSession.session.username, encrypted, { encoding: "base64"} );
}

function createNewSession(username, password, token) {
    currentSession.session = {
        username: username,
        token: token,
        messages: [],
        endpoints: {}
    };

    currentSession.hashedPassword = hashPassword(password)

    saveSessionFile();
}

exports.GetCurrentSession = () => currentSession.session
exports.SessionAddMessage = (from, message) => {
    currentSession.session.messages.push({
        from: from,
        message: message,
        timestamp: new Date(),
    });


    saveSessionFile()
}

exports.SessionAddEndpoint = (username, endpoint) => {
    currentSession.session.endpoints[username] = endpoint;
    saveSessionFile()
}

exports.SessionRemoveEndpoint = (username) => {
    delete currentSession.session.endpoints[username];
    saveSessionFile()
}

exports.SessionGetEndpoint = (username) => {
    return currentSession.session.endpoints[username];
}