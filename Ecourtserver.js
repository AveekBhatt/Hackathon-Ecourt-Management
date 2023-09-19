const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config({path : './configinfo.env'});
const app = require('./ecourtappcontoller');


process.on('uncaughtException' , err=>{
    console.log("Uncaught : Shutting down...");
    console.log( "ERRRORS : " + err.name + " " + err.message);
    console.log(err);
    process.exit(1);
})

const DB = process.env.DATABASE.replace('<password>' , process.env.PASSWORD);
mongoose.connect(DB , {
    useUnifiedTopology: true,
    useNewUrlParser : true ,
    useCreateIndex : true,
    useFindAndModify : false
}).then(con=>{
    console.log(con.connections);
    console.log('DB connection successful!');
})
//console.log(process.env);



const port = process.env.PORT || 7000;
app.listen(port , ()=>{
    console.log("App running on " + port);
})

process.on('unhandledRejection' , err =>{
    console.log(err.name + " " + err.message);
    console.log("Unhandled :  Shutting Down....");
    process.exit(1);
})

//console.log(x);
//TEST
//NEW
//OPEN