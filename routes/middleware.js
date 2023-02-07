exports.isLoggedin = (req, res,next) =>{
    if(req.authenticate){
        next();
    }
    else{
        res.status(404).send('로그인이 필요합니다');
    }
}
exports.isNotLoggedin = (req, res,next,err) =>{
    if(!req.Authenticate()){
        next();
    }
    else{
        res.send('로그인한 상태입니다');
        next(err);
    }
}