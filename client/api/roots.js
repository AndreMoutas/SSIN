const axios = require("./axios");

exports.RequestSqrt = async (number) => {
    const result = await axios.get("https://localhost:3000/sqrt", {
        params: { number: number },
    });

    console.log(result.data);
}

exports.RequestCbrt = async (number) => {
    const result = await axios.get("https://localhost:3000/cbrt", {
        params: { number: number }
    });

    console.log(result.data);
}

exports.RequestNrt = async (number, root) => {
    const result = await axios.get("https://localhost:3000/nrt", {
        params: { number: number, root: root }
    });

    console.log(result.data);
}