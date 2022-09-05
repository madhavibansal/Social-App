
const mongoose = require("mongoose");
const postSchema = mongoose.Schema({
    createdBy:{
        type:mongoose.Types.ObjectId
    },
    resharedBy:[{
        userId:{type:mongoose.Types.ObjectId},
        addedOn:{
            type:Number, default:Date.now()
           }
    }],
    creator:{
        type:String,
        default:''
    },
    title:{
        type: String,
        required:true,
    },
    message:{
        type:String,
        required:true
    },
    tag:{
        type:Array,
        default:[],
    },
    image:{
        type:String,
        default:''
    },
   
    likes:{
        type: Array,
        default:[],
    },
    likeCount:{
        type:Number,
        default:0
    },
    comments:[{
       commentedBy:{
        type:mongoose.Types.ObjectId,ref:'post'
       },
       message:{
            type:String,
            default:''
       },
       addedOn:{
        type:Number, default:Date.now()
       }
       
    }],

    addedOn:{
        type:Number, default:Date.now()
       },
       
    
    updateOn:{
        type:Number, default:Date.now()
       }

})
module.exports = mongoose.model("User",postSchema);