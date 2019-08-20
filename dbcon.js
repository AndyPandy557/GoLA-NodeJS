var mysql = require('mysql');

const hostname = process.env.HOST;
const user = process.env.USER;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;

var pool = mysql.createPool({
    connectionLimit : 10,
    host            : hostname,
    user            : user,
    password        : password,
    database        : database
});

module.exports.pool = pool;
