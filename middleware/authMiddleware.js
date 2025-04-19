const jwt = require ("jsonwebtoken");
const User = require("../models/user");
exports.authMiddleware = async (req,res,next)=>{
    const token = req.header("Authorization");
    if(!token)return res.status(401).json({message: "Access Denied"});
    try{
        const actualToken = token.split(" ")[1]
        const decoded = jwt.verify(actualToken,process.env.JWT_SECRET);
        //fetching user from DB
        //const user = await User.findById(decoded.id).select("-password");
        const user = await User.findById(decoded.id).select("-password");
        if(!user) return res.status(404).json({message: "User not Found"})
        req.user = user;
        next();
    }catch (error){
        res.status(401).json({message: "Invalid Token"});
    }
    };
