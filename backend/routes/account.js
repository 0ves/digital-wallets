const express = require("express")
const router = express.Router()
const {authmiddleware} = require("../authMiddleware.js");
const { Account, Transaction } = require("../db.js");
const { default: mongoose } = require("mongoose");
const { transformer } = require("zod");
// const zod = require("zod")

router.get("/balance", authmiddleware,async(req, res)=>{
    const account = await Account.findOne({
        userId: req.userId
    }) 
    if (!account){
        return res.status(403).json({
            meg:"account does not exits"
        })
    }
    

    res.json({
        balence: account.balance
    })
})

router.post("/transfer",authmiddleware,async(req,res)=>{
    const session = await mongoose.startSession()
    session.startTransaction()
    const {to ,amount} = req.body

    const account = await Account.findOne({userId: req.userId}).session(session)
    const toaccount = await Account.findOne({userId:to}).session(session) 

    if(!toaccount){
        await session.abortTransaction()
        return res.status(400).json({
            msg:"invalid account"
        })

    }
    if ( !account||account.balance < amount){
        await session.abortTransaction()
        return res.status(400).json({msg:"insufficient balence"})
    }

  await Account.updateOne({userId:req.userId},{$inc:{balance:-amount}}).session(session)
  await Account.updateOne({userId:to},{$inc:{balance:amount}}).session(session)
//   const fromAccount=await Account.findOne({userId:req.userId}).session(session)
//   const toAccount= await Account.findOne({userId:to}).session(session)
    await Transaction.create([{userId:req.userId, touserId:to , amount:amount}],{session})
   
    
   await session.commitTransaction()
    session.endSession();
    
    res.json({mes:"Transfer successfull" ,
       
        transformerd: amount
    })
})

router.get('/transactions',authmiddleware,async (req,res)=>{
    const transactionsRow = await Transaction.find({$or:[{userId:req.userId},{touserId:req.userId}]}).populate({path:'userId', select: 'firstname lastname'}).populate({path:'touserId', select: 'firstname lastname'}).lean()
   
    //console.log(transactionsRow);
    
   const transactions = transactionsRow.map(rt => {
    const userId = rt.userId?._id?.toString();
    const touserId = rt.touserId?._id?.toString();
    const currentUserId = req.userId.toString();

    if (userId === currentUserId) {
        rt.status = "send";
    } else if (touserId === currentUserId) {
        rt.status = "receive";
    }
    return rt;
});

     console.log(transactions);
    res.json({
        transactions:transactions
    })
})

module.exports=router;
