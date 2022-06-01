const bcryptjs = require("bcryptjs");
const { getConfig } = require("../config");
const jwt = require("jsonwebtoken");
const { serializerUserResponse } = require("./auth.serializers");
const { UserModel } = require("../users/users.model");

const getUsers = async (req, res) => {
  const usersList = await UserModel.find();
  res.send(usersList);
};

const createUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const candidate = await UserModel.findOne({ email });
    // eslint-disable-next-line no-extra-boolean-cast
    if (!!candidate) res.status(400).send("The email is in use");

    const hashPassword = await bcryptjs.hash(password, 10);

    const newUser = await UserModel.create({
      username,
      email,
      password: hashPassword,
    });

    const userInDb = await newUser.save();

    res.status(201).send(userInDb);
  } catch (err) {
    res.status(500).send("something wrong in db" + err);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { password, email } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) res.status(400).send(`no User with email ${email}`);
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) res.status(400).send("your pass is wrong");

    const token = createToken(user);
    console.log(token);
    user.token = token;
    await user.save();

    res.status(200).send(serializerUserResponse(user, token));
  } catch (err) {
    res.status(500).send("something wrong - " + err);
  }
};

const createToken = user => {
  const config = getConfig();
  return jwt.sign({ uid: user.id }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
};

module.exports = {
  createUser,
  loginUser,
  getUsers,
};
