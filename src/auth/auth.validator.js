const Joi = require("joi");

const validateUser = (req, res, next) => {
  const signUpSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });
  const { error } = signUpSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  next();
};

const validateUserSignIn = (req, res, next) => {
  const signIpSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });
  const { error } = signIpSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  next();
};

module.exports = {
  validateUser,
  validateUserSignIn,
};
