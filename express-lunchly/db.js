/** Database for lunchly */

const pg = require("pg");

const db = new pg.Client("postgresql://superdb:superdbpassword@127.0.0.1/lunchly");

db.connect();

module.exports = db;
