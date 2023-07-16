const express = require("express");
const router = express.Router();
const Question = require("../database/Models/userquestions");
// const User = require("../database/Models/userModel")

router.get("/", async (req, res) => {
  try {
    let Questions = await Question.find();
    if (Questions) {
      //   console.log(Questions);
      res.send({
        success: true,
        payload: { message: "Successfully get All Questions", data: Questions },
      });
    } else {
      res.send({ success: false, payload: null });
    }
  } catch (error) {
    res.send({ success: false, payload: error });
  }
});
module.exports = router;
