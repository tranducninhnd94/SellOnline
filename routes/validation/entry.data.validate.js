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
      roles: Joi.array().items(Joi.object({ id: 1, name: "ADMIN" }), Joi.object({ id: 2, name: "EMPLOYEE" }))
    }
  },

  changePassword: {
    body: {
      password: Joi.string()
        .alphanum()
        .required()
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
      roles: Joi.array().items(Joi.object({ id: 1, name: "ADMIN" }), Joi.object({ id: 2, name: "EMPLOYEE" }))
    }
  },

  updateRoleOfUser: {
    body: {
      storeId: Joi.number().required(),
      userId: Joi.number().required(),
      roles: Joi.array().items(Joi.object({ id: 1, name: "ADMIN" }), Joi.object({ id: 2, name: "EMPLOYEE" }))
    }
  },

  // store
  createStore: {
    body: {
      name: Joi.string()
        .min(3)
        .max(100)
        .required(),
      description: Joi.string()
        .max(5000)
        .required(),
      address: Joi.string()
        .max(500)
        .required(),
      name_unique: Joi.string()
        .alphanum()
        .min(4)
        .max(20)
        .required(),
      bannerImages: Joi.array()
        .items(Joi.object().keys({ id: Joi.number().required(), originalname: Joi.string().required() }))
        .required(),
      types: Joi.array()
        .items(Joi.object().keys({ id: Joi.number().required(), name: Joi.string().required() }))
        .min(1)
        .required()
    }
  },

  updateStore: {
    body: {
      name: Joi.string()
        .min(3)
        .max(100)
        .required(),
      description: Joi.string()
        .max(5000)
        .required(),
      address: Joi.string()
        .max(500)
        .required()
      // name_unique: Joi.string()
      //   .alphanum()
      //   .min(4)
      //   .max(20)
      //   .required()
    }
  },

  // product

  createProduct: {
    body: {
      name: Joi.string()
        .min(3)
        .max(30)
        .required(),

      original_price: Joi.number().required(),

      sale_price: Joi.number().required(),

      images: Joi.array().items(Joi.object().keys({ id: Joi.number().required(), name: Joi.string().required() })),

      tags: Joi.array().items(Joi.object().keys({ id: Joi.number().required(), name: Joi.string().required() })),

      promotions: Joi.array().items(Joi.object().keys({ id: Joi.number().required(), name: Joi.string().required() })),

      description: Joi.string()
        .max(5000)
        .required()
    }
  }
};
