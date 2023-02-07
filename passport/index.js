const passport = require('passport');
const local = require('./localStrategy');
const mysql = require('mysql2');

module.exports = () => {
   passport.serializeUser(function(user, done){
    console.log("USER", user)
    done(null,user.id)
   });
   passport.deserializeUser(function(id,done){
    console.log("deserializeUser id", id);
    var userinfo;
    var sql = 'SELECT * FROM profile WHERE id=?';
    mysql.query(sql, [id], function(err, result){
        try{
            var json = JSON.stringify(result[0]);
            userinfo = JSON.parse(json);
            done(null,userinfo);
        }catch(error){
            console.log(error);
            next(error);
        }
    })
   });
   local();
}