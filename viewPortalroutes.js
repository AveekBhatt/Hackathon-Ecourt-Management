const fs = require('fs');
const express = require('express');
const app = new express();
const morgan = require('morgan');
const multer = require('multer');
const viewController = require('./viewPortalcontroller.js');
const AppError = require('./appError');
const views = express.Router();

views.route("/").get(viewController.getPortalPage);
module.exports=views;