const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const Pincodes = new mongoose.Schema({
    Cityname:{
        type:String,
        required:[true, 'A City named is required']
    },
    Code:{
        type:Number,
        required:[true,'A Pincode is needed'] , 
        unique:true
    }
})

const pins = mongoose.model('pins' , Pincodes);
module.exports=pins;