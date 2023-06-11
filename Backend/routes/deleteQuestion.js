const express = require("express");
const router = express.Router();
const userQuestions = require('../database/Models/userquestions')


router.delete("/:id",  async (req, res) => {
  console.log(req.params.id)
  const key = req.params.id;

  try {
    const responce = await userQuestions.findOneAndDelete({_id : key}) 
    return res.send({success:true})  
} catch (error) {
    res.send({success:false , error:error})
  }
  
});

module.exports = router;
