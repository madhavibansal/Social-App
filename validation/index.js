const joi = require("@hapi/joi");
exports.signUpValidation = (data) => {
  const schema = {
    name: joi.string().min(6).required(),
    email: joi.string().required().email(),
    password: joi.string().min(8).required(),
  };
  return joi.validate(data, schema);
};
exports.signInValidation = (data) => {
  const schema = {
    email: joi.string().required().email(),
    password: joi.string().min(8).required(),
  };
  return joi.validate(data, schema);
};
