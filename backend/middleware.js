const jwt = require("jsonwebtoken");
const jwt_secret = require("./config");

const authmiddleware = (req , res, next)=>{
    const authheadr = req.headers.authantication;
    
    if(!authheadr || authheadr.startsWith('Bearer ')){
        return res.status(403).json({});
    }
    const token = authHedder.split(' '   )[1];
    try {
        const decode = jwt.verify(token, jwt_secret)
        if(decode.userId){
        req.userId = decode.userId;
        next();} 
        else{
            res.status(403).json({})
        }
    } catch (error) {
        res.status(403).json({error});
    }
}

module.exports={
    authmiddleware
}