const axios = require("./axios")
const session = require("./session");

exports.Register = async (username, password, oneTimeId, sender) => {
    const result = await axios.post("https://localhost:5000/register", {
        username: username,
        oneTimeId: oneTimeId,
        password: password,
        endpoint: sender
    })

    session.CreateNewSession(username, password, result.data.token);
    console.log("Successful operation, here is your current session: ", session.GetCurrentSession())
    SetAutomaticHeader(result.data.token);
}

exports.Login = async (username, password, sender) => {
    const decrypted = session.ReadSessionFile(username, password)

    if (!decrypted) {
        console.error("Wrong password, could not decrypt user data, performing server login");

        const result = await axios.post("https://localhost:5000/login", {
            username: username,
            password: password,
            endpoint: sender
        })

        session.CreateNewSession(username, password, result.data.token);
        console.log("Successful operation, here is your current session: ", session.GetCurrentSession())
        SetAutomaticHeader(result.data.token);
    }

    else {
        console.log("Successful local login, here is your session info: ", session.GetCurrentSession())
        SetAutomaticHeader(decrypted.token);
    }
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