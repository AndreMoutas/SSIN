const axios = require("./axios");

exports.RequestSqrt = async (number) => {
    const result = await axios.get("https://localhost:5000/sqrt", {
        params: { number: number },
    });

    return result.data;
}

exports.RequestCbrt = async (number) => {
    const result = await axios.get("https://localhost:5000/cbrt", {
        params: { number: number }
    });

    return result.data;
}

exports.RequestNrt = async (number, root) => {
    const result = await axios.get("https://localhost:5000/nrt", {
        params: { number: number, root: root }
    });

    return result.data;
}