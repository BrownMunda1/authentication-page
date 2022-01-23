const mongoose = require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type: String, 
        required: true,
    },
    username:{
        type: String, 
        required: true,
        unique: true
    },
    email:{
        type: String, 
        required: true,
        unique: true
    },
    phone:{
        type: Number, 
        required: true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    confirm_password:{
        type:String,
        required:true
    }
});

const userModel=mongoose.model('User', userSchema);

module.exports= userModel;