const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : [true,  'user name is required']
    },
   email : {
        type : String,
        required : [true,  'email is required'],
        unique:true
    },
    password : {
        type : String,
        required : [true,  'password is required']
    },
    address : {
        type : String,
        required : [true,  'user name is required']
    },
    phone : {
        type : String,
        required : [true,  'phone number is required']
    },
    userType : {
        type : String,
        required : [true,  'user type is required'],
        default:'client',
        enum:['client','admin','vendor','driver']
    },
    profile : {
        type : String,
        profile:'https://pixabay.com/vectors/user-avatar-log-in-photo-1808597/'
    },
    answer : {
        type:String
    }
},{timestamps:true})

module.exports = mongoose.model('User', userSchema);

