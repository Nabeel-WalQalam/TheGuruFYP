const express = require("express");
const router = express.Router();
const userAnswers = require("../database/Models/useranswer");

module.exports = router;

router.post("/", async (req, res) => {
  try {
    const q_id = req.body.qid;
    console.log(q_id);

    let getAllAnswer = await userAnswers
      .find({ question_id: q_id })
      .populate("question_id")
      .then((answers) => {
        // console.log("Answers:", answers);
        res.send({ success: true, payload: answers });
        // console.log("Question:", answers[0].question);
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
