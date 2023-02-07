const express = require('express');
const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const passportConfig = require('./passport');
const auth = require('./routes/auth');
const morgan = require('morgan');
const app = express();


dotenv.config();
app.set('port', process.env.PORT || 8080);
passportConfig();
app.use(morgan('dev'));
app.use(express.json());

app.use(session({
    resave : true, // 요청이 올 때 세션에 수정 사항이 생기지 않더라도 세션을 다시 저장할지 설정
    saveUninitialized: false, //  세션에 저장할 내역이 없더라도 처음부터 세션을 생성할지 설정하는 것.
    secret : process.env.COOKIE_SECRET,
    cookie:{
        httpOnly:true,
        secure : false,
    }
}));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', auth);
app.use((req,res,next)=>{
    const error = new Error(`${req.method} ${req.url}라우터가 없습니다`);
    error.status = 404;
    next(error);
})

app.use((req,res,next,err)=>{
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_env !== 'production'  ? err : {};
    res.status(err.status || 500);
})

app.listen(app.get('port'),()=>{
    console.log(app.get('port') , 'waiting...');
})
