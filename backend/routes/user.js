const express = required("express")
const { string } = require("zod")
const jwt_secret = require("../config.js")
const { User } = require("../db.js")
const router= express.router()
const zod = require("zod")
const jwt = require("jsonwebtoken")
const middleware=require("../middleware.js")

const signupSchema= zod.object({
    usernam: zod.string(),
    password: zod.string(),
    firstname: zod.string(), 
    lastname:zod.string()
})

const signinSchema = zod.object({
    username: zod.string(),
    password:zod.string()
})

const userupdateSchema = zod.object({
    	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.sytring().optional(),
})

const userbulkSchema = zod.object({
    uerename:zod.string().optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional()
})

// dont forget to make change 1 at line 15
router.post("/signup",async(req,res)=>{
    const body= req.body;
    const {success}= signupSchema.safeParse(req.body)
    if (!success) {
       return res.status(411).json({msg:"1. invalid inputs.l"})
    }
    const user = User.findOne({
        username:body.username
    })
    if (user._id) {
        res.json({msg:"email is in use please enter another email"})
    }
     const dbuser = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })

     const userId = dbuser._id;

		/// ----- Create new account ------

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })
        const token = jwt.sing({
            userId
           }, jwt_secret);
        res.json({msg:"user created successfully!",
            token:token
        })
    }) 

    router.post("signin",(req,res)=>{
        const body = req.body;
        const{success}=signinSchema.safeParse(body) 
        
        if (!success) {
            res.status(403).json({msg:"invalid inputs"})
        }
        const user = User.findOne({
            usernam:body.username,
            password:body.password
        })
        if (user) {
            const token= jwt.sign({
               userid: user._id
            },jwt_secret)
            res.json({token: token})
        return
        }
        res.staus(411).json({
            msg:"error while loging in"
        })
    })

    router.put("/",middleware,async(req , res)=>{
        const body = req.body;
        const {success}=userupdateSchema.safeParse(body)
        if (!success) {
            res.status(403).json({msg:"invalid input"})    
        } 
        // here
            const user = await User.updateOne({_id:userid},body)
        res.json({
            msg:"updated successfully"
        })
    })

    router.get("/bulk",async(req, res)=>{
         const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })
        res.json({
            users:users.map(user=>({
                username:user.username,
                firstName:usre.firstName,
            lastName: user.lastName,
            _id: user._id
            }))
        })

    })
module.exports= router;