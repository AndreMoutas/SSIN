let clientInfo = {};

module.exports = {
    addClientInfo(username, ip, port) {
        clientInfo[username] = `${ip}:${port}`;
        console.log(clientInfo);
    },
    getClientInfo(username) {
        return clientInfo[username];
    }
}