// validate dữ liệu đầu vào

var Joi = require("joi");

// example
module.exports = {
  createUser: {
    body: {
      email: Joi.string()
        .email()
        .min(4)
        .max(45)
        .required(),
      password: Joi.string()
        .alphanum()
        .min(4)
        .max(16)
        .required(),
      fullname: Joi.string()
        .min(2)
        .max(45)
        .required(),
      phone_number: Joi.string()
        .regex(/[0-9]/)
        .required(),
      address: Joi.string()
        .max(500)
        .required(),
      roles: Joi.array().items(Joi.object({ id: 1, name: "ADMIN" }), Joi.object({ id: 2, name: "USER" }))
    }
  },

  login: {
    body: {
      email: Joi.string()
        .email()
        .min(4)
        .max(45)
        .required(),
      password: Joi.string()
        .alphanum()
        .min(4)
        .max(16)
        .required()
    }
  },

  updateUser: {
    body: {
      fullname: Joi.string()
        .min(2)
        .max(45)
        .required(),
      phone_number: Joi.string()
        .regex(/[0-9]/)
        .required(),
      address: Joi.string()
        .max(500)
        .required(),
      roles: Joi.array().items(Joi.object({ id: 1, name: "ADMIN" }), Joi.object({ id: 2, name: "USER" }))
    }
  }
};
