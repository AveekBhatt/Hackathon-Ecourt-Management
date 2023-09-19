const path = require('path');
const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const AppError = require('./appError');
const ErrorHandler = require("./errorhandler");
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const ejs = require('ejs');
const app = new express();
const cookieParser = require('cookie-parser');

const ecourtsroutes = require("./ecourtsroutes");
const view = require("./viewPortalroutes");
const pins = require("./pinroutes");

app.set('view engine', 'html');
//app.set('view engine', 'css');
app.set('views', path.join(__dirname, 'additionaldata'));
app.engine('html', require('ejs').renderFile);

//app.use(express.static('/home/aveek'));
app.use(express.static(__dirname + '/publichtml'));


app.use(

    helmet.contentSecurityPolicy({
  
      directives: {
  
        defaultSrc: ["'self'", 'data:', 'blob:'],
  
        baseUri: ["'self'"],
  
        fontSrc: ["'self'", 'https:', 'data:'],
  
        scriptSrc: ["'self'", 'https://*.cloudflare.com'],
  
        scriptSrc: ["'self'", 'https://*.stripe.com'],
  
        scriptSrc: ["'self'", 'http:', 'https://*.mapbox.com', 'data:'],
  
        frameSrc: ["'self'", 'https://*.stripe.com'],
  
        objectSrc: ["'none'"],
  
        styleSrc: ["'self'", 'https:', 'unsafe-inline'],
  
        workerSrc: ["'self'", 'data:', 'blob:'],
  
        childSrc: ["'self'", 'blob:'],
  
        imgSrc: ["'self'", 'data:', 'blob:'],
  
        connectSrc: ["'self'", 'blob:', 'https://*.mapbox.com'],
  
        upgradeInsecureRequests: []
  
      }
  
    })
  
  );

console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV==='development')
{
app.use(morgan('dev'));
}

const limiter = rateLimit({
    max : 100 , 
    windowMs : 60 * 60 * 1000 , 
    message : 'Too mamy requests from this IP , ply try again later'
})
app.use('/api', limiter);
app.use(express.json({limit : '1000'}));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());


app.use((req , res , next)=>{
    console.log("Hello from the middleware");
    req.requestTime = new Date().toISOString();
    console.log(req.headers);
    console.log(req.cookies);
    next();
})

/*
app.get('/' , (req,res)=>{
   //res.send("Hello There");
    //res.end("Hello There");
    // res.status(200).send("Hello New one");
    res.status(404).json({ messages : "This is new app" , app : 'Natours'});
})
app.post('/' , (req,res)=>{
    res.send("This is not possible right now");
})
*/
app.use("/Ecourt/JudgementPortal" , ecourtsroutes);
app.use("/Ecourt/Pin" , pins);
app.use("/" , view); 
/*
app.all('*',(req,res,next)=>{
    const str = 'Cannot find ' + req.originalUrl + " here" ;
    next(new AppError(str,404));
})
*/

app.use(ErrorHandler);


module.exports = app;

