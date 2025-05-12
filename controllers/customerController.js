const Customer = require("../models/customer");
exports.registerCustomer = async(req,res) => {
    try{
        const { name, email, contact, address, gender, userId} = req.body;
        const customer = new Customer ({ name, email, contact, address, gender, userId});
        await customer.save();
        res.status(200).json({success: true, data: customer});
    }catch(error){
        res.status(500).json({success: false, message: error.message});
    }
};

//get All customer

exports.allCustomer = async(req,res)=>{
    try{
       const customers = await Customer.find().populate("userId","name email");
  .exec();
  const { id } = req.params;
if (!mongoose.Types.ObjectId.isValid(id.trim())) {
  return res.status(400).json({ success: false, message: 'Invalid ID format' });
}
  res.status(200).json({success: true, data: customers});
    }catch(error){
        console.error("Error fetching customers:", error)
        res.status(500).json({success: false, message: error.message});
    }
};


//get single customer
exports.singleCustomer = async(req,res)=>{
    try{
        const customer = await Customer.findById(req.params.id).populate("userId", "name email");
        if(!customer) return res.status(404).json({success: false,message: "Customer not found"});
        res.status(200).json({success:true, data: customer});
    }catch(error){
      res.status(500).json({success: false, message: error.message});  
    }
};
