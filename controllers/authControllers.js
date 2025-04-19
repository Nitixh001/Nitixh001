//authentication
const bcrypt = require("bcryptjs");
const jwt = require ("jsonwebtoken");
const User = require("../models/user");
//register new user
const registerUser= async(req,res)=>{
try{
    const { name, email, password, userType} = req.body;
    //validation
    if(!name || !email || !password ||!userType){
      return res.status(401).json({message: "All Fields Input is Required"});
    }
    //password length validation
    if(password.length<9){
      return res.status(401).json({message: " Password atleast require 9 characters"});
    }
    //check for existing user
    const userExists = await User.findOne({email});
    if(userExists) return res.status(409).json({message: "user already exists"});
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);   
    //create user
    const newUser = await User.create({name, email, password: hashedPassword, userType});
    res.status(201).json({message: "User Registered Sucessfully", user: newUser });
}catch(error){
    res.status(500).json({message: error.message});
}
};
//loginuser
const userLogin = async(req,res)=>{
try{
    const {email, password} = req.body;
  //check for existing user
  const existingUser = await User.findOne({email});
  if(!existingUser) return res.status(400).json({message: "Invalid email or password"});
  //compare for password
  const isMatch = await bcrypt.compare(password, existingUser.password);
  if(!isMatch) return res.status(400).json({message: "Invalid email or password"});
  //JWT tokens if login is successfull
  const token = jwt.sign({ id: existingUser._id, userType: existingUser.userType }, process.env.JWT_SECRET, {
    expiresIn: "4d",
  });
  //success response
  res.status(200).json({message: "Login Successfull",token,
    user:{
      id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
      userType: existingUser.userType,

    },
  });

 /* res.json({ token, userType: existingUser.userType });*/
} catch (error) {
  res.status(500).json({ message: error.message });
}
};
//change password
const userChangePassword = async (req,res)=>{
    try{

        const { oldPassword, newPassword} = req.body;
        //validation
        if(!oldPassword || !newPassword){
          return res.status(400).json({message: "Both Password's are Required"});
        }
        if(oldPassword === newPassword){
          return res.status(400).json({message: "New Password must be Different"});
        }
        const user = await User.findById(req.user.id);
        if(!user) return res.status(404).json({message:"User Not Found"});
        //old password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if(!isMatch) return res.status(400).json({message: "Old Password is Incorrect"});
        //hash new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();
        res.json({message:"Password Changed Sucessfully"});
    } catch (error){
        res.status(500).json({message:error.message});
    }
};
module.exports = {registerUser, userLogin, userChangePassword};