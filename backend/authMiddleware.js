const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("./config");

function authmiddleware (req , res, next){
     const authHeader = req.headers.authorization;
    console.log(authHeader);
    
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({msg:"you are not authrized"});
    }
    const token = authHeader.split(' '   )[1];
    try {
        const decode = jwt.verify(token, JWT_SECRET)
        if(decode.userId){
        req.userId = decode.userId;
        console.log("this is userID :" ,decode.userId );
        
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