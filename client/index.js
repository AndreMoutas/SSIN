const axios = require("axios");


async function RequestSqrt() {
    const result = await axios.get("http://localhost:3000/sqrt", {
        params: { number: 100 }
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

RequestSqrt();
RequestCbrt();
RequestNrt();