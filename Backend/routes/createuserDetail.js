const express = require("express");
const User = require("../database/Models/userModel");
const router = express.Router();
module.exports = router;

router.post("/", async (req, res) => {
  const { bio, gender, city, student, institude, imageUrl, email } = req.body;
  console.log(bio, gender, city, student, institude, imageUrl, email);

  const newuser = await User.findOneAndUpdate(
    { email },
    {
      profileImage: imageUrl,
      bio,
      gender,
      city,
      institude,
      student,
    }
  );

  res.send({ payload: newuser, success: true });
});
