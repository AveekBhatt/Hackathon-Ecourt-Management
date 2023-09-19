const fs = require('fs');
const express = require('express');
const app = new express();
const morgan = require('morgan');
const catchAsync = require('./catchAsync');
const AppError = require('./appError');
const handleFactory = require('./handleFactory');
const multer = require('multer');
const sharp = require('sharp');

exports.getPortalPage = (req,res) =>{
    res.status(200).set(
        'Content-Security-Policy',
        "script-src 'self' https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js 'unsafe-inline' 'unsafe-eval';" ,
        ).render("homepage.html");
}

exports.gethome = (req,res) =>{
  res.status(200).set(
      'Content-Security-Policy',
      "script-src 'self' https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js 'unsafe-inline' 'unsafe-eval';" ,
      ).render("homepage.html");
}