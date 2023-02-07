const mysql = require('mysql2');
var db= mysql.createConnection({
    host : '127.0.0.1',
    port : '3306',
    user : 'root',
    password : 'Dnjswns1*',
    database : 'fint'
})
db.connect();
module.exports = db;
