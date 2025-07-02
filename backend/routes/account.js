const express = require("express")
const router = express.router()
const middleware = require("../authMiddleware.js");
const { Account } = require("../db.js");
const { default: mongoose } = require("mongoose");
// const zod = require("zod")

router.get("/balance", middleware,async(req, res)=>{
    const account = await Account.findOne({
        userid: req.id
    }) 
    if (!account){
        return res.status(403).json({
            meg:"account does not exits"
        })
    }
    

    res.json({
        balence: account.balence
    })
})

router.post("/transfer",middleware,async(req,res)=>{
    const session = await mongoose.startSession()
    session.startTransaction()
    const [to , ammount] = req.body

    const account = await Account.findOne({userid: req.userid}).session(session)
    const toaccount = await Account.findOne({userid:to}).session(session) 

    if(!toaccount){
        await session.abortTransaction()
        return res.status(400).json({
            msg:"invalid account"
        })

    }
    if ( !account||account.balence < ammount){
        await session.abortTransaction()
        return res.status(400).json({msg:"insufficient balence"})
    }

    await Account.updatOne({userid:req.userid},{$inc:{balence:-ammount}}).session(session)
    await Account.updatOne({userid:to},{$inc:{balence:ammount}}).session(session)
    await session.commitTransaction()

    res.json({mes:"Transfer successfull"})
})

module.exports=router;