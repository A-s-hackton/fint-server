const db = require("../config/db.config")
const bcrypt = require('bcrypt')
const passport = require('passport')
const jwt = require('jsonwebtoken')
//import Util from '../util/jwt'
//const util = require('../util/jwt')

const join = async (req, res) => {
    console.log("----------hi");
    const { id, pwd, pwc } = req.body;
    console.log(req.body);

    if (id && pwd && pwc) {

        db.promise().query(`SELECT * FROM profile WHERE id = '${id}'`)
            .then((result) => {
                //console.log("--------------------------")
                //console.log(result)
                //console.log("--------------------------")
                if (result[0].length <= 0 && pwd == pwc) {

                    db.promise().query(`INSERT INTO profile (id,pw) VALUES('${id}','${pwd}')`)
                        .then((data) => {
                            console.log(data)
                        })
                        .catch((err) => {
                            console.log(err);
                        })

                    return res.status(200).send("재명이 성공했어용")

                } else if (pwd != pwc) {
                    res.status(400).send('입력된 비밀번호가 서로 다릅니다')
                }
                else {
                    res.status(401).send('이미 존재하는 아이디입니다');
                }
            })
            .catch((err) => {
                console.log(err)
                res.status(400).send(err)
            })


        //db.query(`SELECT * FROM profile WHERE id = ${id}`, function(err,results){

    } else {
        res.status(402).send('입력하지 않은 정보가 있습니다');
        // next(err);
    }
}

const login = async (req, res) => {
    const { id, password} = req.body;
    console.log(req.body);
    // passport.authenticate('local', (authError,user,info)=>{
    //     if(authError){
    //         console.error(authError);
    //     }
    //     if(!user){
    //         return res.status(404).send('login Error');
    //     }

    //     return req.login(user, (loginError)=>{
    //         if(loginError){
    //             console.error(loginError);
    //         }
    //         //return next();
    //     })
    // })(req, res);
    //db.query(`SELECT id,pw FROM profile WHERE id = '${id}' AND pw='${password}'`);
    // try {
    //     if (!id) {
    //         res.status(401).send({
    //             ok: false,
    //             message: 'no people',
    //         })
    //     } else {
    //         if(id == id){
    //             const user = {id:id}

    //             console.log(process.env.JWT_SECRET)
    //             const newaccessToken = jwt.sign(user);
    //             res.status(200).send({
    //                 ok: true,
    //                 message: "sucess",
    //                 newaccessToken
    //             });
    //         }
    //         else{
    //             res.status(401).send({
    //                 ok:false,
    //                 message : 'incorrect password'
    //             })
    //         }
    //     }
    // }catch(err){
    //     console.error(err);
    //     return res.status(500).json({
    //         code:500,
    //         message: 'server error',
    //     });
    if(id && password){
        db.query(`SELECT * FROM profile WHERE id = ${id} AND password = ${password}`, function(error,results,fields){
            if(error) throw error;
            if(results.length >0){
                // req.session.is_logined = true;
                // req.session.nickname = id;
                // req.session.save(function(){
                //     res.json({
                //         status : 200,
                //         message : "complected",
                //         data:{
                //             isLogined:true,
                //             nickname:id
                //         }
                //     })
                // })
                res.json({
                    status : 200,
                    message : "complected",
                    data:{
                        isLogined:true,
                        nickname:id
                    }
                })
            }else{
                res.json({
                    status:404,
                    message : "no id",
                })
            }
        })
    }

}

const logout = async (req, res) => {
    return req.session.destroy(function (err) {
        return err;
    })
}

const test = async (req, res) => {
    console.log(req.body)
    return res.send("이재명 바보")
}


const profile = async (req, res) => {
    console.log(res.body)

    try {
        db.query('SELECT * FROM WHERE id=?', [req.body.id], function (err, result) {
            if (err) throw err;
            if (result) {
                const sql = "UPDATE profile SET ?"
                db.query(sql, req.body, function (err, result) {
                    if (err) throw err;
                    console.log(result);
                    res.send('등록이 완료되었습니다');
                })
            }
        });
        return res.send("hi")
    } catch (err) {
        console.log(err);
        return res.send(err)
    }
}


module.exports = { join, login, logout, profile, test }