const db = require("../database/index");

module.exports = {
    async boom(from, to){
        const  crypto  = require('crypto');
        let key = await db.Keys.findOne({ where: {from: from.username, to:to.username}});
        console.log(key)
        if(key){
            return key.encryptionKey;
        }

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
                    cipher: 'aes-256-cbc',
                    passphrase: 'top secret'
                }
            }, async (err, publicKey, privateKey) => {
                await db.Keys.create({
                    from: from.username,
                    to: to.username,
                    encryptionKey: publicKey,
                    decryptionKey: privateKey,
                });
                resolve(publicKey);

                /*
                console.log(publicKey + privateKey);
                let encrypted = crypto.publicEncrypt(publicKey, Buffer.from("ola")).toString("base64");
                console.log(encrypted);
                let decr = crypto.privateDecrypt({
                    key: privateKey.toString(),
                    passphrase: 'top secret',
                }, Buffer.from(encrypted, "base64"));
                console.log(decr.toString("utf-8"));
                 */
            });
        })


    },
}