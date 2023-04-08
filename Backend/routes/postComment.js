const express = require("express");
const router = express.Router();
const userExist = require("../middlewares/userExist");
const userAnswer = require("../database/Models/useranswer");
const usercomment = require("../database/Models/usercomment");

router.post("/", userExist, async (req, res) => {
  if (req.success) {
    // console.log(req.user);
    const { answer_id, email, user, comment_description } = req.body;
    // const result = await usercomment({
    //   answer_id: answer_id,
    //   comment: comment_description,
    //   user: user,
    // });
    const result = await userAnswer.findOneAndUpdate(
      { _id: answer_id },
      // { commet: { comment_description, user } }
      { $push: { commet: { comment_description, user } } },
      { new: true }
    );
    // let saveComment = await result.save();
    // let finalresult = await result.commet.push({ comment_description, user });
    if (result) {
      // await finalresult.save();
      res.send({
        success: true,
        payload: "Comment Successfully Posted",
        data: result,
      });
    } else {
      res.send({ success: false, payload: "Error Occured " });
    }
  } else {
    res.send({ success: false, payload: "Invalid Email" });
  }
});

module.exports = router;
