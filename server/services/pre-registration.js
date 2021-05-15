const db = require("../database");


const oneTimeIdLength = 12;

function generateOneTimeId() {
    let result = "";
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < oneTimeIdLength; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function generateUsername(fullName) {
    let username = fullName.replace(/ /g, "");
    return username.substr(0, Math.min(8, username.length));
}

module.exports = {
    addUser(fullName, clearanceLevel) {
        if(fullName.length < 10) {
            console.error("Full name should contain at least 10 characters!");
            return;
        }
    
        let oneTimeId = generateOneTimeId();
        let username = generateUsername(fullName);
    
        let user = db.User.build({ 
            oneTimeId: oneTimeId,
            fullName: fullName,
            username: username, 
            clearanceLevel: clearanceLevel
        });
    
        user.save().then(() => {
            console.log("The new user instance was successfully added to the database!")
            console.log("User details: username = " + username + " , oneTimeId = " + oneTimeId);
        });
    }
}