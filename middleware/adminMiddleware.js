//admin endpoints
const adminMiddleware = (req, res, next)=>{
   if( req.user.userType === "admin"){
    next();// access granted
   }else{
    return res.status(403).json({message: "Access denied, Admin Only"});
   }
   };
   module.exports = {adminMiddleware};