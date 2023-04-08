const express = require("express");
const router = express.Router();

const userAnswer = require("../database/Models/useranswer");
const usercomment = require("../database/Models/usercomment");
// const userquestions = require("../database/Models/userquestions");

router.post("/", async (req, res) => {
  if (req.method == "POST") {
    // console.log(req.user);
    const { qid, user, text } = req.body;
    console.log("answer_id", qid);

    try {
      const result = await userAnswer.findById({ _id: qid });
      if (result) {
        // console.log("answer_ id", result.upVote);
        // result.votes
        const upIndex = result.upVote.findIndex((id) => id == String(user._id));
        const downIndex = result.downVote.findIndex(
          (id) => id == String(user._id)
        );

        if (text === "upVote") {
          if (downIndex !== -1) {
            result.downVote = result.downVote.filter(
              (id) => id !== String(user._id)
            );
          }
          if (upIndex === -1) {
            result.upVote.push(user._id);
          } else {
            result.upVote = result.upVote.filter(
              (id) => id !== String(user._id)
            );
          }
        } else if (text === "downVote") {
          if (upIndex !== -1) {
            result.upVote = result.upVote.filter(
              (id) => id !== String(user._id)
            );
          }
          if (downIndex === -1) {
            result.downVote.push(user._id);
          } else {
            result.downVote = result.downVote.filter(
              (id) => id !== String(user._id)
            );
          }
        }

        await userAnswer.findByIdAndUpdate(qid, result);
        res.send({
          success: true,
          payload: "Vote Successfully Posted",
        });
      }
    } catch (error) {
      console.log(error);
    }

    // const result = await userAnswer.findOneAndUpdate(
    //   { _id: answer_id },
    //   // { commet: { comment_description, user } }
    //   { $push: { commet: { comment_description, user } } },
    //   { new: true }
    // );
    // let saveComment = await result.save();
    // let finalresult = await result.commet.push({ comment_description, user });
    // if (result) {
    //   // await finalresult.save();
    //   res.send({
    //     success: true,
    //     payload: "Comment Successfully Posted",
    //     data: result,
    //   });
    // } else {
    //   res.send({ success: false, payload: "Error Occured " });
    // }
  } else {
    res.send({ success: false, payload: "Invalid request" });
  }
});

module.exports = router;
