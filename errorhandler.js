const { TokenExpiredError } = require("jsonwebtoken");
const AppError = require("./appError");

const handleCastErrorDB = err =>{

    const message = 'Invalid ' + err.path + " : " + err.value ;
    return new AppError(message,400);

}

const sendErrorDev = (err,res) =>{
    res.status(err.statusCode).json({
        add : '+' ,
        status : err.statusCode , 
        error : err,
        message : err.message , 
        stack : err.stack
    })
}

const handleCodeErrorDB = err =>{
    const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
    console.log(value);
    const message = "Duplicate Field Value :" + value +  " Please Enter a different Value";
    return new AppError(message,404);
}

const handleValidErrorDB = err =>{
   let errors = Object.values(err.errors).map(el => el.message);
   const message = 'Validation Errors : ' + errors.join('. ');
   return new AppError(message,404);
}

const JsonWebTokenErr = () =>{
    return new AppError('Invalid token' , 401);
}
const handleExpiredError = () =>{
    return new AppError('Token Expired' , 401);
} ;

const handletimeoutErr = err =>{
    return new AppError('EXPIRED',401);
}
const sendErrorProd = (err,res) =>{
    if(err.isOperational){
        res.status(err.statusCode).json({
            add : '+' ,
            error : err,
            status : err.statusCode , 
            message : err.message
        })
    }
    else {
        console.error("Error : " + err);
        res.status(500).json({
            status : 'fail',
            error : err,
            message : "Something went wrong"
        })
    }
}

module.exports = (err , req , res , next) =>{
    err.statusCode = err.statusCode || 500 ;
    err.status = err.status || 'error';

    if(process.env.NODE_ENV==='development'){
        sendErrorDev(err,res);
    }
    else if(process.env.NODE_ENV==='production'){
        let error = {...err};
        if(err.name === 'CastError'){
            err = handleCastErrorDB(err);
        }
        if(err.code === 11000){
            err = handleCodeErrorDB(err);
        }
        if(err.name==='ValidationError'){
            err= handleValidErrorDB(err);
        }
        if(err.name==='JsonWebTokenError'){
            err = JsonWebTokenErr(err);
        }
        if(err.name === 'TokenExpiredError'){
            err= handleExpiredError(err);
        }
        if(err.code==='ETIMEDOUT'){
            err=handletimeoutErr(err);
        }
        sendErrorProd(err,res);
    }
}