const jwt = require("jsonwebtoken");
const { getConfig } = require("../config");
const { UserModel } = require("./users.model");

const authorize = () => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.replace("Bearer ", "");

    let payload;
    try {
      payload = jwt.verify(token, getConfig().jwt.secret);
    } catch (err) {
      return res.status(401).send("Authorization failed");
    }

    req.userId = payload.userId;

    next();
  };
};

const authorizeWithCookies = async function (req, res, next) {
  const token = req.cookies.token;

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).send("Authorization failed");
  }

  const user = await UserModel.findById(payload.id);

  req.user = user;

  next();
};

module.exports = {
  authorizeWithCookies,
  authorize,
};
