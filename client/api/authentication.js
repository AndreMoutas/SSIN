const axios = require("./axios")
const session = require("./session");

exports.Register = async (username, password, oneTimeId, sender) => {
    let result;
    try {
        result = await axios.post("https://localhost:5000/register", {
            username: username,
            oneTimeId: oneTimeId,
            password: password,
            endpoint: sender
        })
    } catch (error) {
        return 401;
    }

    session.CreateNewSession(username, password, result.data.token);
    console.log("Successful operation, here is your current session: ", session.GetCurrentSession())
    SetAutomaticHeader(result.data.token);

    console.log(currentSession);

    return 200;
}

exports.Login = async (username, password, sender) => {
    const decrypted = session.ReadSessionFile(username, password)

    if (!decrypted) {
        console.error("Wrong password, could not decrypt user data, performing server login");

        let result;

        try {
            result = await axios.post("https://localhost:5000/login", {
                username: username,
                password: password,
                endpoint: sender
            })
        } catch (error) {
            return 401;
        }

        session.CreateNewSession(username, password, result.data.token);
        console.log("Successful operation, here is your current session: ", session.GetCurrentSession())
        SetAutomaticHeader(result.data.token);
    }

    else {
        console.log("Successful local login, here is your session info: ", session.GetCurrentSession())
        SetAutomaticHeader(decrypted.token);
    }

    return 200;
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

    
    try {
        const encrypted = fs.readFileSync("./users/" + username, "base64");
        const decrypted = decryptWithPassword(encrypted, hashedPassword);

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