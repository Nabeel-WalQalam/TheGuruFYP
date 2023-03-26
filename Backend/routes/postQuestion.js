const express = require("express");
const router = express.Router();
const userExist = require("../middlewares/userExist");
const userQuestions = require("../database/Models/userquestions");

router.post("/", userExist, async (req, res) => {
  if (req.success) {
    // console.log(req.body);
    const { id, email, title, description, tag } = req.body;
    const result = await userQuestions({
      title: title,
      description: description,
      tags: tag,
      users: id,
    });
    let saveQuestion = await result.save();
    if (saveQuestion) {
      res.send({ success: true, payload: "Question Successfully Posted" });
    } else {
      res.send({ success: false, payload: "Error Occured " });
    }
  } else {
    res.send({ success: false, payload: "Invalid Email" });
  }
});

module.exports = router;
