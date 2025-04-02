import Joi from "joi";

const userSchema = Joi.object({
  nickName: Joi.string().min(2).max(25).required(),
  email: Joi.string().email().min(2).max(25).required(),
  password: Joi.string().min(6).max(255).required(),
  confirmPassword: Joi.string()
    .required()
    .valid(Joi.ref("password"))
    .messages({ "any.only": "password do not match" }),
  profileImage: Joi.string(),
});

export const validateUser = (userInfo) =>
  userSchema.validate(userInfo, { abortEarly: false });
