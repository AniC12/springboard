/** Database setup for BizTime. */

const { Client } = require("pg");
let DB_URI;

if (process.env.NODE_ENV === "test") {
    DB_URI = "postgresql://bloglyuser:bloglypassword@127.0.0.1/biztime_test";
} else {
    DB_URI = "postgresql://bloglyuser:bloglypassword@127.0.0.1/biztime";
}

let db = new Client({
    connectionString: DB_URI
});

db.connect();

module.exports = db;