
const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    name:{
        type: String,
        required:true,
        default:''
    },
    email:{
        type:String,
        required:true,
        default:''
    },
    password:{
        type:String,
        required:true
    },
    
    isLogin: {
        type: Boolean,
        default: false
    },

},{timestamps:true})
module.exports = mongoose.model("post",userSchema);