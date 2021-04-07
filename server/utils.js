const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

module.exports = {
    generateString(length) {
        let result = "";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },
    generateUsername(fullName) {
        let username = fullName.replace(/ /g, "");
        return username.substr(0, Math.min(7, username.length - 1));
    }
}
