const axios = require("./axios");
const session = require("./session")
const crypto = require('crypto');

async function getClientEndpoint(username) {
    const knownEndpoint = session.SessionGetEndpoint(username)
    if (knownEndpoint) {
        try {
            // Ping succeeded, so endpoint is valid
            await axios.get(`http://${knownEndpoint.url}/ping`);
            return knownEndpoint;
        } catch (err) {
            // Ping failed, so endpoint is likely invalid
            session.SessionRemoveEndpoint(username);
        }
    }

    console.log("Asking the server!")

    // Ask the server for the user's endpoint + keys
    const result = await axios.get("https://localhost:5000/clientKeys", {
        params: { username: username },
    })

    if (result.data === null)
        return null

    session.SessionAddEndpoint(username, result.data);

    return result.data;
}


function encryptMessage(message, encryptionKey) {
    return crypto.publicEncrypt(encryptionKey, Buffer.from(message)).toString("base64");
}

function decryptMessage(encrypted, decryptionKey) {
    try {
        return crypto.privateDecrypt(decryptionKey, Buffer.from(encrypted, "base64")).toString("utf-8");
    } catch (err) {
        console.log("Failed message decryption.")
        return null;
    }
}

exports.send = async (receiver, message) => {
    if (!message)
        return console.error("Tried to send empty message")

    const endpoint = await getClientEndpoint(receiver, true);
    if (endpoint === null)
        return console.error("User is likely offline.")

    // Message the other client directly
    await axios.post(`http://${endpoint.url}/message`, {
        content: encryptMessage(message, endpoint.encryptionKey),
        username: session.GetCurrentSession().username,
        nonce: crypto.randomBytes(256).toString("base64")
    });
}

exports.receive = async (sender, encrypted, nonce) => {
    if (!encrypted)
        return console.error("Tried to receive empty message");

    const endpoint = await getClientEndpoint(sender, false);
    if (endpoint === null)
        return console.error("User is likely offline (should not happen if you're receiving a message)")

    const decrypted = decryptMessage(encrypted, endpoint.decryptionKey);

    if (decrypted)
        session.SessionAddMessage(sender, encrypted, endpoint.decryptionKey, nonce)

    return decrypted;
}

exports.getAll = () => {
    const session = authentication.GetCurrentSession();

    let messages = [];
    if (session.messages.length === 0)
        return [];
    session.messages.slice().reverse().forEach((message) => {
        messages.push({sender: message.from, timestamp: message.timestamp, content: message.message});
    })
    return messages;
}

exports.displayAll = () => {
    const session = authentication.GetCurrentSession();

    let messages = [];
    if (session.messages.length === 0)
        return [];
    session.messages.slice().reverse().forEach((message) => {
        messages.push({sender: message.from, timestamp: message.timestamp, content: message.message});
    })
    return messages;
}

exports.displayAll = () => {
    const currSession = session.GetCurrentSession();

    if (!currSession)
        return console.error("You are not logged in.");
    if (currSession.messages.length === 0)
        return console.error("You have no messages.");
    currSession.messages.slice().reverse().forEach((message) => {
        console.log(`- Message From ${message.from}, in ${new Date(message.timestamp).toTimeString()}`)
        console.log(`${decryptMessage(message.encrypted, message.decryptionKey)}`)
        console.log()
    })
}