const jwt = require("jsonwebtoken");
config = require("../config");

const getToken = (data) => {
  return jwt.sign(
    {
      uid: data._id,
      email: data.email,
    },
    config.get("security").secret,
    { expiresIn: config.get("security").token_exp }
  );
};

const verifyToken = (token) => {
  return jwt.verify(token, config.get("security").secret);
};

module.exports = {
  getToken,
  verifyToken,
};
