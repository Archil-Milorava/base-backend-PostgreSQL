import Joi from "joi";

const userSchema = Joi.object({
  nickName: Joi.string().min(2).max(25).required(),
  firstName: Joi.string().min(2).max(25).required(),
  lastName: Joi.string().min(2).max(25).required(),
  dob: Joi.date().required(),
  email: Joi.string().email().min(2).max(25).required(),
  password: Joi.string().min(6).max(255).required(),
  profileImage: Joi.string(),
});

export const validateUser = (userInfo) =>
  userSchema.validate(userInfo, { abortEarly: false });
