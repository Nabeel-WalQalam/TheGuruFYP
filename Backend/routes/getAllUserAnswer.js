const express = require("express");
const router = express.Router();
const userAnswers = require("../database/Models/useranswer");
const Questions = require("../database/Models/userquestions");

module.exports = router;

router.post("/", async (req, res) => {
  try {
    const q_id = req.body.qid;
    console.log(q_id);

    let getAllAnswer = await userAnswers
      .find({ question_id: q_id })
      .populate("question_id")
      .then((answers) => {
        if (answers.length === 0) {
          // If there are no answers, retrieve the question separately
          return Questions.findById(q_id);
        } else {
          console.log("Answers:", answers);
          // Send the answers to the client
          res.send({ success: true, payload: answers });
        }
      })
      .then((question) => {
        if (question) {
          console.log("Question:", question);
          // Send the question to the client
          res.send({ success: true, payload: [question] });
        }
      })
      .catch((err) => {
        console.error(err);
        res.send({ success: false, payload: "Nothing Found" });
      });
    // console.log(getAllAnswer);
    // if (getAllAnswer.length) {
    //
    // } else {
    //
    // }
  } catch (error) {
    console.log(error);
    res.send({ success: false, payload: error });
  }
});

module.exports = router;
