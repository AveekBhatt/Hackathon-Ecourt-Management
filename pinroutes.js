const fs = require('fs');
const express = require('express');
const app = new express();
const AppError = require('./appError');
const pinroute = express.Router();
const pincontoller = require("./pincodepostcontroller");

pinroute.route("/postpincode").post(pincontoller.postpin);

module.exports=pinroute;