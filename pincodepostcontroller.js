const fs = require('fs');
const express = require('express');
const app = new express();
const morgan = require('morgan');
const catchAsync = require('./catchAsync');
const AppError = require('./appError');
let Pins = require("./pincodesmodel.js");
const multer = require('multer');
const sharp = require('sharp');

exports.postpin = catchAsync(async(req,res)=>{
      const pin = await Pins.create(req.body);
      res.status(200).json({
        status: 'success' , 
        pin 
      })
})