const express = require("express");
const router = express.Router();
const userExist = require("../middlewares/userExist");
// const userQuestions = require("../database/Models/userquestions");
const userAnswer = require("../database/Models/useranswer");

router.post("/", userExist, async (req, res) => {
  if (req.success) {
    // console.log(req.user);
    const { qid, user, description } = req.body;
    const result = await userAnswer({
      question_id: qid,
      asnwer_description: description,
      user: user,
    });
    // result.views.userslist.push(id);
    let saveQuestion = await result.save();
    if (saveQuestion) {
      res.send({ success: true, payload: "Answer Successfully Posted" });
    } else {
      res.send({ success: false, payload: "Error Occured " });
    }
  } else {
    res.send({ success: false, payload: "Invalid Email" });
  }
});

module.exports = router;
