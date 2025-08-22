let mongoose=require('mongoose');

let userEnquirySchema=new mongoose.Schema({
    name: String,
  email: { type: String, unique: true },
  password: String,
  joinDate: { type: Date, default: Date.now }
    
});

let userModel =mongoose.model('enquiry',userEnquirySchema); // "enquiry" is our collection name  & userSchema is the field we created

module.exports=userModel ;