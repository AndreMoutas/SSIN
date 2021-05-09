let clientInfo = {};

module.exports = {
    addClientInfo(username, endpoint) {
        clientInfo[username] = endpoint;
        console.log(clientInfo);
    },

    getClientInfo(username) {
        return clientInfo[username];
    }
}