const express = require("express")
const { string } = require("zod")
const jwt_secret = require("../config.js")
const { User,Account } = require("../db.js")
const router= express.Router()
const zod = require("zod")
const jwt = require("jsonwebtoken")
const {authmiddleware}=require("../authMiddleware.js")

const signupSchema= zod.object({
    username: zod.string(),
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
    firstname: zod.string().optional(),
    lastname: zod.string().optional(),
})

const userbulkSchema = zod.object({
    uerename:zod.string().optional(),
    firstname:zod.string().optional(),
    lastname:zod.string().optional()
})

// dont forget to make change 1 at line 15
router.post("/signup",async(req,res)=>{
    const body= req.body;
    console.log(body);
    
    const {success}= signupSchema.safeParse(req.body)
    if (!success) {
       return res.status(411).json({msg:"1. invalid inputs."})
    }
    const user = await User.findOne({
        username:body.username
    })
    //console.log(user)
    if (user) {
       return res.status(411).json({msg:"email is in use please enter another email"})
    }
     const dbuser = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
    })
   if (!dbuser) {
    return res.status(409).json({msg:"user failed to create"})
   }
     const userId = dbuser._id;

        console.log("Created User Document:", dbuser); // Check what dbuser looks like
    console.log("Extracted userId:", userId);    // Check if userId is a proper ObjectId

    if (!userId) { // Safety check - should not happen if User.create succeeds
        console.error("User ID not generated after creating user.");
        return res.status(500).json({ msg: "Failed to create user ID for account." });
    }
     /// ----- Create new account ------
     
     
     await Account.create({
         userId: userId,
        balance: 1 + Math.random() * 10000
    })
        const token = jwt.sign({
            userId
           }, jwt_secret);
        res.json({msg:"user created successfully!",
            token:token
        })
    }) 

    router.post("/signin", async (req,res)=>{
        try{
        const body = req.body;
        const{success, data}=signinSchema.safeParse(body) 
        console.log(data);
        
        if (!success) {
          return  res.status(403).json({msg:"invalid inputs",
             errors: data.error?.issues
          })
        }
        const user = await User.findOne({
            username:data.username,
            password:data.password
        })
        // console.log(user);
        
        if (user) {
            const token= jwt.sign({
               userId: user._id
            },jwt_secret)
            res.json({msg: "Login successful!",
                token: token})
        return
        }
        res.status(401).json({
            msg:"Invalid username or password."
        })}
        catch(error){
            res.status(500).json({msg:"internal server error",error})
        }
    })

    router.put("/",authmiddleware,async(req , res)=>{
        try{const body = req.body;
        const {success ,data}=userupdateSchema.safeParse(body)
        if (!success) {
            res.status(403).json({msg:"invalid input"})    
        } 
        // here
            const user = await User.updateOne({_id:req.userId},req.body)
        res.json({
            msg:"updated successfully"
        })}
        catch(e){
            console.log(e);
            
        }
    })

    router.get("/me", authmiddleware,async(req,res)=>{
        const user = await User.findOne({_id:req.userId})
        const account = await Account.findOne({userId: req.userId})
        console.log(user.username);
        console.log(account.balance);
        console.log(user.username);
        
        res.json({username: user.username,
                firstname: user.firstname,
                lastname:user.lastname,
                balance: account.balance
        })
    })

    router.get("/bulk",async(req, res)=>{
         const filter = req.query.filter || "";
        console.log(filter);
        
    const users = await User.find({
        $or: [{
            firstname: {
                "$regex": filter
            }
        }, {
            lastname: {
                "$regex": filter
            }
        }]
    })
        res.json({
            users: users.map(user => ({
                username:user.username,
                firstname:user.firstname,
            lastName: user.lastname,
            _id: user._id
            }))
        })

    })
module.exports= router;