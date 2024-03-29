const fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat(path) {
    fs.readFile(path, 'utf8', (error, data) => {
        if (error) {
            console.log("ERROR:", error);
            process.exit(1);
        } else {
            console.log(data);
        }
    });
}

async function webCat(url) {
    try {
        let res = await axios.get(url);
        console.log(res.data);
    } catch (error) {
        console.log("ERROR:", error);
        process.exit(1);
    }
}

let path = process.argv[2];

if (path.slice(0, 4) === 'http') {
    webCat(path);
} else {
    cat(path);
}