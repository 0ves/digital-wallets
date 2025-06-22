
const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://ovesnadaf:tuW2yF1UDwW6hT5Y@clusterpayment.ebzfmhn.mongodb.net/")

const accountSchema = new mangoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        unique:true,
        ref:'User'
    },
    balance:{
        type:Number,
        required:true
    }
})
const userschema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minLength:3,
        maxLength:49
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    firstname:{
        type:String,
        required:true,
        trim:true,
        maxLength:40
    },
    lastname:{
        type:String,
        required:true,
        trim:true,
        maxLength:40
    }
});

const User = mongoose.model('User',userschema)
const Account = mongoose.model('Account',accountSchema) 

module.exports= {
    User,
    Account
}