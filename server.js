require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const connectDB = require('./config/db')
const PORT = 3700;
connectDB();
//middleware setup
app.use(express.json());
app.use(express.urlencoded({extended: true}));//
//app.use(express.static("public"));
//route
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);
const userRoutes = require("./routes/userRoutes");
app.use("/api/user",userRoutes);
const customerRoutes = require("./routes/customerRoutes");
app.use("/api/customer",customerRoutes);
//api testing 
app.get('/',(req,res)=>{
    res.json("API is Running !");
});
//error handling
app.use((err, req, res, next)=>{
    console.error(err.stack);
    res.status(500).json({error: "Something Unexpected Occured"});
});

//server
app.listen(PORT,()=>{
    console.log(`server is listening on http://localhost:${PORT}`);
});
