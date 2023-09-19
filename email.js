let nodemailer = require('nodemailer');
const fs = require("fs");
let sendEmail = async options =>{
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port:587,
        secure:false,
        auth : {
            user : 'aveek.738@gmail.com', 
            pass : 'itgsgkhchoncdiuz'
        }
    })
    const Caseinfo = fs.readFileSync("./additionaldata/emailapproved.html" , "utf-8");
    console.log(options.email + " " + options.subject + " " + options.message);
    let mailOptions = {
        from : 'Magic Elves <aveek.738@gmail.com>',
        to : options.email , 
        subject : options.subject , 
        html : Caseinfo
    };
    console.log(mailOptions);
     transporter.sendMail(mailOptions , (err,info)=>{
        if(err){
            return console.log(err);
        }
        console.log(info.messageId + " " + info.response);
     });
    
};

module.exports = sendEmail;