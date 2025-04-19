//CRUD Operations

const { default: mongoose } = require("mongoose");
const User = require("../models/user");
//getAllUser
exports.getAllUsers = async (req,res) => {
    try{
        const users = await User.find().select("-password");
        res.json(users);
    } catch(error){
        console.error("Error message",error);
        res.status(500).json({
            message: "Access denied ,you are not Admin",
            error: error.message,
            success: false
    });
    } 
};

//getSingleUser by Id
exports.getSingleUser = async (req,res)=>{
    try{
        const user = await User.findById(req.params.id).select("-password");
        if(!user) return res.status(404).json({message: "User Not Found"});
        res.json(user);
    } catch (error){
        res.status(500).json({message: error.message});
    }
};

//update user
exports.updateUser = async (req,res)=>{
    try{
        const { name, email, status } = req.body;
        if(!name && !email && !status ){
            return res.status(400).json({message: "Above fields are required",
                success: false
            });
        }
        if(req.user._id.toString() !==req.params.id && //user ain't updating self profile
        req.user.userType !== 'admin'){ // user is not admin (so request denied)
            return res.status(403).json({message: "Forbidden: Not allowed to update this user",
                success: false
            });
        }
        const user = await User.findById(req.params.id);
        if(!user) return res.status(404).json({message: "User Not found",
            success: false
        });
        user.name = name || user.name;
        user.email = email || user.email;
        user.status = status || user.status;
        const updatedUser = await user.save();
        res.json({message: "User Updated Sucessfully", 
        updatedUser});
    } catch (error){
        console.error("Update user error:", error);
        return res.status(500).json({message:"Internal Server Error:",
            error: error.message,
        success: false
    });
       }
    };
        

//deleteUser(admin only)
exports.deleteUser = async (req,res)=>{
    try{
      if(req.body.confirm !== true){
        return res.status(400).json({message:"Confirmation Required to delete user",
            success: false,
        });
    }
    const userId = req.params.id.trim();//remove whitespaces
        if(!mongoose.Types.ObjectId.isValid(userId)){//check fir userid(mongo) is valid or not
            return res.status(400).json({message: "Invalid User ID Format",
                success: false,
            });
        }
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if(!deletedUser) return res.status(404).json({message: "User not Found"});
        return res.status(200).json({message: `User${deletedUser.email}deleted successfully`,
         success: true,
         date:   new Date()
        });
    } catch (error){
        console.error("Delete error message:", error);
        return res.status(500).json({message:"Internal Server Error" ,
            error: error.message,
           success: false
    });
    }
};