
const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://ovesnadaf:tuW2yF1UDwW6hT5Y@clusterpayment.ebzfmhn.mongodb.net/")

const accountSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        unique:true,
        ref:'User'
    },
    balance:{
        type:Number,
        required:true
    }
})
const transactionSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'User'
    },
    touserId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'User'
    },
    amount:{
        type:Number,
        require:true
    }},
    
    { 
    timestamps: true 
  }
)
const userschema =new mongoose.Schema({
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
const Transaction = mongoose.model('Transaction',transactionSchema)

module.exports= {
    User,
    Account,
    Transaction
}