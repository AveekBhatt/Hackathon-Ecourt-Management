const fs = require('fs');
const express = require('express');
const app = new express();
const AppError = require('./appError');
const caseroute = express.Router();
const casecontoller = require("./casecontroller");

caseroute.route("/postal").post(casecontoller.postUser);
caseroute.route("/emailsend").post(casecontoller.emailapprove);
module.exports=caseroute;