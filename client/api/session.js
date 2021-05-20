const fs = require('fs');
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

function saveSessionFile() {
    if (!fs.existsSync("./users"))
        fs.mkdirSync("./users")

    // Saves JSON encrypted
    const encrypted = encryptWithPassword(JSON.stringify(currentSession.session), currentSession.hashedPassword);
    fs.writeFileSync("./users/" + currentSession.session.username, encrypted, { encoding: "base64"} );
}

const currentSession = {
    session: null,
    hashedPassword: null
}

exports.ReadSessionFile = (username, password) => {
    const hashedPassword = hashPassword(password);

    try {
        const encrypted = fs.readFileSync("./users/" + username, "base64")
        const decrypted = decryptWithPassword(encrypted, hashedPassword);
        currentSession.session = JSON.parse(decrypted);
        currentSession.hashedPassword = hashedPassword

        return JSON.parse(decrypted);
    } catch (err) {
        return null;
    }
}

exports.CreateNewSession = (username, password, token) => {
    currentSession.session = {
        username: username,
        token: token,
        messages: [],
        endpoints: {},
        usedNonces: {}
    };

    currentSession.hashedPassword = hashPassword(password)

    saveSessionFile();
}

exports.GetCurrentSession = () => currentSession.session

exports.SessionAddMessage = (from, encrypted, decryptionKey, nonce) => {
    if (currentSession.session.usedNonces[nonce])
        return console.error("Attempted to add duplicate message, possible replay attack!")

    currentSession.session.messages.push({
        from: from,
        encrypted: encrypted,
        decryptionKey: decryptionKey,
        timestamp: new Date(),
    });

    currentSession.session.usedNonces[nonce] = true

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