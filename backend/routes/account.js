const express = require("express")
const router = express.Router()
const {authmiddleware} = require("../authMiddleware.js");
const { Account } = require("../db.js");
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
    const {to ,ammount} = req.body

    const account = await Account.findOne({userId: req.userId}).session(session)
    const toaccount = await Account.findOne({userId:to}).session(session) 

    if(!toaccount){
        await session.abortTransaction()
        return res.status(400).json({
            msg:"invalid account"
        })

    }
    if ( !account||account.balance < ammount){
        await session.abortTransaction()
        return res.status(400).json({msg:"insufficient balence"})
    }

  await Account.updateOne({userId:req.userId},{$inc:{balance:-ammount}}).session(session)
  await Account.updateOne({userId:to},{$inc:{balance:ammount}}).session(session)
  const fromAccount=await Account.findOne({userId:req.userId}).session(session)
  const toAccount= await Account.findOne({userId:to}).session(session)
 
   
    
   await session.commitTransaction()

    res.json({mes:"Transfer successfull" ,
       
        transformerd: ammount
    })
})

module.exports=router;
