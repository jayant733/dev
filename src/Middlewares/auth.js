const jwt = require('jsonwebtoken');
const User = require("../models/user")
const authenticateToken = async (req, res, next) => {
  const cookies = req.cookies;
  const { token } = cookies;
  if (!token) {
    return res.sendStatus(401)
  }


  const decodedojbect = jwt.verify(token, "dev@tookensecret")

  const { _id } = decodedojbect;
  const user = await User.findOne({ _id });

  if (!user) {
    return res.sendStatus(401);
  }
  else {
    req.user = user;
    next()
  }



}

module.exports = { authenticateToken };