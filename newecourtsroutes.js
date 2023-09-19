const fs = require('fs');
const express = require('express');
const app = new express();
const AppError = require('./appError');
const caseroute = express.Router();
const casecontoller = require("./casecontroller");

caseroute.route("/").post(casecontoller.postUser);

module.exports=caseroute;