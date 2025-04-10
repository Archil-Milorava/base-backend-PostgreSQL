import Joi from "joi";

const signUpSchema = Joi.object({
  nickName: Joi.string().min(2).max(255).required(),
  email: Joi.string().email().min(2).max(255).required(),
  password: Joi.string().min(6).max(255).required(),
  confirmPassword: Joi.string()
    .required()
    .valid(Joi.ref("password"))
    .messages({ "any.only": "password do not match" }),
  profileImage: Joi.string(),
});

export const signUpValidator = (credentials) =>
  signUpSchema.validate(credentials, { abortEarly: false });

const LoginSchema = Joi.object({
  nickName: Joi.string().min(2).max(255).required(),
  password: Joi.string().min(0).max(255).required(),
});

export const logInValidator = (credentials) =>
  LoginSchema.validate(credentials, { abortEarly: false });
