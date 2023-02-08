import jwtUtil from "../util/jwt"

const authJWT = (req,res,next) => {
    const authorization = req.headers.authorization
    if (authorization) {
        const token = authorization.split('Bearer ')[1];
        const result = jwtUtil.verify(token);
        if (result.ok){ // 검증이 됐으면
            console.log(result)
            req.id = result.id;
            next()
        } else { // 검증에 실패 or 토큰 만료
            res.status(401).send({
                ok:false,
                message:result.message,
            })
        }
    }
}

export default authJWT