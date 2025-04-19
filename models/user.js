 
const mongoose = require("mongoose");
//Set up default mongoose connection
const userSchema = new mongoose.Schema(
{
name: {type: String, required: true},
email: {type: String, required: true, unique: true},
password: {type: String, required: true},
userType: {type: String, enum: ["admin", "user"],default: "user"},
status: {type: String, enum: ["active", "inactive"], default: "active"},
},
{timestamps: true}
);
module.exports = mongoose.model("User", userSchema);

