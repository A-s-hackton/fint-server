const jwt = require("jsonwebtoken")

const secret = `${process.env.JWT_SECRET}`
modules.exports = {
    // accessToken발급
    sign:(user) => {
        const payload = {
            id:user.id,
        }
        console.log("payload",payload);
        console.log("secret",secret);
        const accessToken = jwt.sign(payload, secret, {
            algorithm: 'HS256', // 암호화 알고리즘
            expiresIn: '1h', 	  // 유효기간
        });
        console.log(accessToken);
        return accessToken
    },
    // sign:(user) => {
    //     const payload = {
    //         id:user.id,
    //     }

    //     return jwt.sign(payload, secret, {
    //         algorithm: 'HS256', // 암호화 알고리즘
    //         expiresIn: '1h', 	  // 유효기간
    //     });
    // },


    // access token검증
    verify:(token) => {
        let decoded = null;
        try {
            decoded = jwt.verify(token,secret);
            console.log(decoded)
            return {
                ok:true,
                id:decoded.id,
                name:decoded.name,
                role:decoded.role,
            }
        }catch(err){
            return {
                ok:false,
                message:err.message
            }
        }
    },


}