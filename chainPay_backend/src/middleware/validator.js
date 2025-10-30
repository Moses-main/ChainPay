const Joi = require("joi");

const schemas = {
  register: Joi.object({
    userId: Joi.string().required(),
    phone: Joi.string()
      .pattern(/^\+?[1-9]\d{1,14}$/)
      .required(),
  }),
  send: Joi.object({
    userId: Joi.string().required(),
    recipient: Joi.string()
      .pattern(/^0x[a-fA-F0-9]{40}$/)
      .required(),
    amount: Joi.number().positive().required(),
  }),
  chat: Joi.object({
    userId: Joi.string().required(),
    message: Joi.string().min(1).max(1000).required(),
  }),
};

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message,
      });
    }

    next();
  };
};

module.exports = {
  validate,
  schemas,
};
