const express = require('express');

const session = require('express-session');
const mysql = require('mysql');


const passport = require('passport');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const passportConfig = require('./passport');
const methodOverride = require('method-override');
const MySQLStore = require('express-mysql-session')(session)

const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const options = {
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 3,
    message: "you have exceed the limit",
    headers: false,
    handler: function(req, res ) {
        res.status(options.statusCode).json({ entry: { exceeded_rate_limit: true, message: options.message } });
    }
}
const auth = require('./routes/auth');
const db = require('./config/db.config');
const sessionStore = new MySQLStore(options)
class App {
    constructor() {
        dotenv.config()

        db.connect((error) => {
            if (error) {
              console.log(error)
              console.log('❌ DB error')
            } else {
              console.log('✅ DB Connected')
            }
          })

        this.app = express();
        this.setMiddleWare();
        this.getRouting();

        passportConfig();

        const port = 8080;
        this.app.listen(port, () => {
            console.log('http://localhost:', port, 'waiting...');
        })

    }

    setMiddleWare() {
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(methodOverride());
        this.app.use(session({
            secret:process.env.cookiesecret,
            resave:false,
            saveUninitialized:true,       
            store:sessionStore                                 
          }))
        this.app.use(passport.initialize()); //req객체에 passport 설정 심기
        this.app.use(passport.session()); // req.session에 passport 정보를 저장
    }

    getRouting() {
        this.app.use('/auth', auth)
    }
}


const appObj = new App()

// ------------

// app.use(morgan('dev'));

/*
app.use(session({
    resave : true, // 요청이 올 때 세션에 수정 사항이 생기지 않더라도 세션을 다시 저장할지 설정
    saveUninitialized: false, //  세션에 저장할 내역이 없더라도 처음부터 세션을 생성할지 설정하는 것.
    secret : process.env.COOKIE_SECRET,
    cookie:{
        httpOnly:true,
        secure : false,
    }
}));
*/
// app.use(bodyParser.urlencoded({extended : true}));
// app.use(bodyParser.json());

// app.use(cors({
//     origin:true,
//     crendentials: true,
// }));

// dotenv.config();
// passportConfig();
// app.use(cookieParser(process.env.COOKIE_SECRET));
// app.use(passport.initialize()); //req객체에 passport 설정 심기
// app.use(passport.session()); // req.session에 passport 정보를 저장

// app.use('/auth', auth);
// app.use((req,res,next)=>{
//     const error = new Error(`${req.method} ${req.url}라우터가 없습니다`);
//     error.status = 404;
//     next(error);
// })

// app.use((err,req,res,next)=>{
//     res.locals.message = err.message;
//     res.locals.error = process.env.NODE_env !== 'production'  ? err : {};
//     res.status(err.status || 500);
// })

