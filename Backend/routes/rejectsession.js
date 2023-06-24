const express = require('express')
const router = express.Router()
const authuser = require('../middlewares/authuser');
const User = require("../database/Models/userModel")
const Chat = require("../database/Models/chatModel");
const userModel = require('../database/Models/userModel');

module.exports = router;

router.post("/", authuser, async (req, res) => {// send existing chat if available or craete new one
  if (req.user) {
    const user_id = req.body.user_id;
    // console.log(req.body)
    if (user_id) {
     
if(req.user._id !==  user_id){
  try {

    // const res=await userModel.findOneAndUpdate({_id:req.user._id,chatRequests: { $elemMatch: { _id: user_id } }})
    const r = await userModel.findOneAndUpdate(
      { _id: req.user._id },
      { $pull: { chatRequests: { _id: user_id } } }
    );


    res.send({ success: true, payload: "Rejected Successfully" });
}
catch (error) {
  console.log("first")
  console.log(error)
  res.send({ success: false, payload: "Network Error" });
}

}
else {
res.send({ success: false, payload: "User_id not Found in body" });

}
}
else {
res.send({ success: false, payload: "User authentication error" });
}
}
else{
  res.send({ success: false, payload: "cannot create chat with yourself" });
}

       



});
