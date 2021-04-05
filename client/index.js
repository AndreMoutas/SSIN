const axios = require("axios");


async function TestFunction() {
    const result = await axios.get("http://localhost:3000/sqrt", {
        params: { number: 100 }
    });

    console.log(result.data);
}


TestFunction();