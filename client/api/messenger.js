const axios = require("./axios");
const authentication = require("./authentication")

async function getClientEndpoint(username) {
    const knownEndpoint = authentication.SessionGetEndpoint(username)
    /*
    if (knownEndpoint) {
        try {
            // Ping succeeded, so endpoint is valid
            await axios.get(`http://${knownEndpoint}/ping`);

            return knownEndpoint;
        } catch (err) {
            // Ping failed, so endpoint is likely invalid
            authentication.SessionRemoveEndpoint(username);
        }
    }*/

    console.log("Asking the server!")

    // Ask the server for the user's endpoint
    const result = await axios.get("https://localhost:3000/clientInfo", {
        params: {username: username},
    })

    console.log(result.data.encryptionKey);
    if (result.data === null)
        return null
    const endpoint = result.data.endpoint;

    authentication.SessionAddEndpoint(username, endpoint);
    return endpoint;
}

exports.send = async (receiver, message) => {
    const endpoint = await getClientEndpoint(receiver);

    if (endpoint === null)
        return console.error("User is likely offline.")

    // Message the other client directly
    await axios.post(`http://${endpoint}/message`, {
        text: message,
        username: authentication.GetCurrentSession().username
    });
}

exports.displayAll = () => {
    const session = authentication.GetCurrentSession();

    if (session.messages.length === 0)
        return console.log("You have no messages.");
    session.messages.slice().reverse().forEach((message) => {
        console.log(`- Message From ${message.from}, in ${new Date(message.timestamp).toTimeString()}`)
        console.log(`${message.message}`)
    })
}