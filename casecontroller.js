const fs = require('fs');
const express = require('express');
const app = new express();
const morgan = require('morgan');
const catchAsync = require('./catchAsync');
const AppError = require('./appError');
const sendEmail = require('./email');
let Report = require("./ecourtmodel.js");
let Pins = require("./pincodesmodel.js");

const multer = require('multer');
const sharp = require('sharp');

exports.getUser = catchAsync(async (req,res)=>{
    const samplecase = await Report.find();
    res.status(200).json({
        status: 'success' ,
        samplecase
    })
})
exports.postUser = catchAsync(async (req,res) =>{
    console.log(req.body.Pincode);
    try{
    const pincheck = await Pins.find({"Code": req.body.Pincode});
    console.log(pincheck[0].Cityname);
    const samplecase =  await Report.create(req.body);
    res.status(200).json({
        status: 'success' ,
        samplecase
    })
   }catch(err){
    console.log(err);
    console.log("NOT A VALID PINCODE")
   }
});


exports.emailapprove = catchAsync(async(req,res,next) => {
    let user = await Report.findOne({email : req.body.email});
    if(!user){
      return next(new AppError('There is no User with this',404));
    }

    const resetToken =   user.createPasswordResetToken();
    await user.save({validateBeforeSave : false});
   
    /*
    let resetUrl = req.protocol + "://" + req.get('host') + "/api/v1/users/resetPassword/" + resetToken;
    const message = 'Forgot your Password ? Submit a PATCH request with password and passwordConfirm to : ' + resetUrl + "\nIf you did not forget your password then Please ignore this email ";
    console.log(user.email);
    */
    //const Caseinfo = fs.readFileSync("./additionaldata/index.html" , "utf-8");
    
    await sendEmail({
      email : user.email , 
      subject : 'Case File'
    })
    res.status(200).json({
      status : 'success' , 
      message : 'Token sent to email'
    })

})