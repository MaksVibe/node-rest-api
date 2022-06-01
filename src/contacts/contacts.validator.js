const Joi = require("joi");

const validateAddedContact = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.message);
  next();
};

const validateUpdatedContact = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30),
    email: Joi.string().email(),
    phone: Joi.string(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.message);
  next();
};

const validatePatch = (req, res, next) => {
  const updContSchema = Joi.object({
    name: Joi.string().min(2).max(20),
    email: Joi.string()
      .min(2)
      .max(20)
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
    phone: Joi.string().min(6).max(12),
    favorite: Joi.boolean().required(),
  });
  const { error } = updContSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  next();
};

module.exports = {
  validateAddedContact,
  validateUpdatedContact,
  validatePatch,
};
