const db = require("../database/index");
const crypto = require('crypto');

function generateKeyPair(){
    return new Promise(resolve => {
        crypto.generateKeyPair('rsa', {
            modulusLength: 4096,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
            }
        }, (err, publicKey, privateKey) => {
            resolve([publicKey, privateKey]);
        });
    })
}
module.exports = {
    async getMessagingKeys(from, to){
        const existingKey = await db.Keys.findOne({ where: {
            from: from.username,
            to: to.username
        }});

        if (existingKey)
            return existingKey;

        const [publicKey, privateKey] = await generateKeyPair();

        return await db.Keys.create({
            from: from.username,
            to: to.username,
            encryptionKey: publicKey,
            decryptionKey: privateKey,
        })
    },
}