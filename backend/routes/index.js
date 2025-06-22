const express = require("express")

const router = express.router()
const userrouter=require("./user")
const accountrouter= require("./account")

router.use("/user",userrouter)
router.use("/account",accountrouter)

module.exports= router;
