const passport = require('passport');
const local = require('./localStrategy');
const mysql = require('mysql2');

module.exports = () => {
   passport.serializeUser(function(user, done){ //req.session 객체에 어떤 데이터를 저장할지 정하는 메서드(로그인시 실행됨)
    console.log("USER : ", user)
    done(null,user.id)  //done 함수의 첫번 째 인수는 에러발생시 사용하는것, 두 번째 인수는 저장하고싶은 데이터를 저장
   });
   passport.deserializeUser(function(id,done){ //매요청시 시작
    console.log("deserializeUser id : ", id);
    var userinfo;
    var sql = `SELECT * FROM profile WHERE '${id}'`;
    mysql.query(sql, [id], function(err, result){
        try{
            var json = JSON.stringify(result[0]);
            userinfo = JSON.parse(json);
            done(null,userinfo);
        }catch(err){
            console.log(err);
            done(err);
        }
    })
   });
   local();
}