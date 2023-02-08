const mysql = require('mysql');
const db= mysql.createConnection({
    host : '10.80.161.216',
    port : '3306',
    user : 'fint2',
    password : 'Dnjswns1*',
    database : 'fint'
})
module.exports = db;
