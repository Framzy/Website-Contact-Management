import Joi from "joi";

const registerUserValidation = Joi.object({
  username: Joi.string()
    .regex(/^[a-zA-Z0-9_]+$/)
    .min(6)
    .max(30)
    .required()
    .messages({
      "string.pattern.base":
        "Username hanya boleh berisi huruf, angka, dan underscore",
    }),
  password: Joi.string().min(8).max(100).required(),
  name: Joi.string().max(100).required(),
});

const loginUserValidation = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const getUserValidation = Joi.string().max(30).required();

const updateUserValidation = Joi.object({
  username: Joi.string()
    .regex(/^[a-zA-Z0-9_]+$/)
    .min(6)
    .max(30)
    .required(),
  password: Joi.string().min(8).max(100).optional(),
  name: Joi.string().max(100).optional(),
});

export {
  registerUserValidation,
  loginUserValidation,
  getUserValidation,
  updateUserValidation,
};
