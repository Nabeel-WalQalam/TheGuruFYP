const jwt = require("jsonwebtoken");

const privateKey = "hunfaisagoodboy";
module.exports = (req, res, next) => {
  const token = req.headers.token;
  //   console.log("headers", req.body.token);

  if (!token) {
    res.send({ success: false, payload: "Token not found" });
    return;
  }
  try {
    const decoded = jwt.verify(token, privateKey);
    req.user = decoded;
    next();
  } catch (error) {
    res.send({ success: false, payload: error });
  }
};
