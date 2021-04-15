const registration = require("./authentication");
const axios = require("axios");

// Adds Authorization header automatically
axios.interceptors.request.use(
    request => {
        const userJSONData = require('./user.json');
        if (userJSONData)
            request.headers['Authorization'] = `Bearer ${userJSONData.token}`
        return request;
    },
    error => {
        return Promise.reject(error)
    }
)

async function RequestSqrt() {
    const result = await axios.get("http://localhost:3000/sqrt", {
        params: { number: 100 },
    });

    console.log(result.data);
}

async function RequestCbrt() {
    const result = await axios.get("http://localhost:3000/cbrt", {
        params: { number: 27 }
    });

    console.log(result.data);
}

async function RequestNrt() {
    const result = await axios.get("http://localhost:3000/nrt", {
        params: { number: 32, root: 5 }
    });

    console.log(result.data);
}

//RequestSqrt();
//RequestCbrt();
// RequestNrt();

/*
registration.Register('William','k0CkalZpZRD9','epic');
*/
// registration.Register('William','obxV4VtyMl0F','epic9000');
//registration.Login('epic9000');