const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedin, isNotLoggedin } = require('./middleware');
const db = require('../config/db.config');
const router = express.Router();

router.post('/join', isNotLoggedin, async(req, res, next) =>{
    const { id, pwd, pwc} = req.body;
    if(id && pwd && pwc){
        db.query('SELECT * FROM profile WHERE id = ?', [id], function(err,results){
            if(err) throw err;
            if(results.length <=0 && pwd== pwc){

                db.query('INSERT INTO profile (id,pwd) VALUES(?,?)',[id, bcrypt.hash(pwd,12)], function(err){
                    if(err) throw err;
                    res.send('회원가입 성공!');
                });
            }else if(pwd != pwc){
                res.status(400).send('입력된 비밀번호가 서로 다릅니다')
                next(err);
            }
            else{
                res.status(401).send('이미 존재하는 아이디입니다');
                next(err);
            }
        });
    }else{
        res.status(402).send('입력하지 않은 정보가 있습니다');
        next(err);
    }
})

router.get('/login', isNotLoggedin, (req, res,next)=>{
    passport.authenticate('local', (authError,user,info)=>{
        if(authError){
            console.error(authError);
            return next(authError);
        }
        if(!user){
            return res.status(404).send('login Error');
        }
        return req.login(user, (loginError)=>{
            if(loginError){
                console.error(loginError);
                return next(loginError);
            }
            return next();
        })
    })(req, res, next);
})
router.get('/logout',isLoggedin, function(req,res){
    req.session.destroy(function(err){
        return next(err);
    })
})

module.exports = router;
