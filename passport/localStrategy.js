const passport = require('passport');
const mysql = require('mysql2');
const localStrategy = require('passport-local').Strategy;

module.exports = () =>{
passport.use(new localStrategy({
    usernameField : 'id',
    passwordField : 'pwd',
},
    function(id, pwd, done){
        var sql = 'SELECT * FROM USER WHERE ID = ? AND PWD?'
        mysql.query(sql, [id, pwd], function(err, result){
            if(err){
                console.log('mysql error');
                res.statusCode = 500;
            }
            if(result.length === 0){
                console.log("none result");
                return done(null, false, {message : 'Incorrect'});
            }else{
                console.log(result);
                var json = JSON.stringify(result[0]);
                var userinfo = JSON.parse(json);
                console.log("userinfo" + userinfo);
                return done(null, userinfo);
            }
        })
    }))
}