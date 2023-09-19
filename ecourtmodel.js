const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const ApplyCase= new mongoose.Schema({
    CaseType:{
        type:String ,
        required: [true , 'The case must have a type'],
        enum : ['Business Case' , 'Civil Case' , 'Criminal Case']
    },
    CourtType:{
        type:String ,
        required: [true , 'There must be a court type'] ,
        enum : ['District Court' , 'High Court' , 'Supreme Court']
    },
    CarriedOn:{
        type:String ,
        required: [true , 'There must be a court to be carried on from'] ,
        enum : ['None' , 'District Court' , 'High Court']
    },

    name:{
       type:String,
       required: [true , 'There must be an Attorney name']
    },

    email:{
        type : String , 
        required : [true , "Please Enter An Email"],
        unique : true ,
        validate : [validator.isEmail , 'Please Enter A Valid Email'], 
    } , 
    phonenumber:{
        type:Number,
        required: [true, "Enter a Phone number"],
        unique:true,
        length:10
    }, 
    Attorneyname:{
       type:String ,
       required : [true , "Please Enter An Attorney name"],
    },

    Attorneyemail:{
        type:String , 
        required : [true , "Please Enter An Email"],
        unique : true ,
        validate : [validator.isEmail , 'Please Enter A Valid Email'], 
    }, 

    Address:{
        type:String ,
        required:[true , "Please Enter An Address"]
    },

    cityname:{
        type:String ,
        required: [true, "Please Enter a City Name"],
    },
    
    Pincode:{
        type:Number ,
        required:[true, 'A pincode is required'],
        length:6
    }
})

ApplyCase.methods.createPasswordResetToken = function() {
    let resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    
    console.log(resetToken + " " + this.passwordResetToken);
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
   
    return resetToken;
}
const Report = mongoose.model('Report' , ApplyCase);
module.exports=Report;