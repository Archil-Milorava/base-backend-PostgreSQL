import appError from "../../utils/errorHandler.js";
import { BAD_REQUEST } from "../../constants/http.js";
import { validateUser } from "../../utils/validators.js";

export const createUser = async (req, res, next) => {
  try {
    // const { error, value } = userSchema.validate(req.body);

    const { error, value } = validateUser(req.body);

    if (error) {
      throw new appError(error, BAD_REQUEST);
    }
  } catch (error) {
    next(error);
  }
};

export const signUp = async (req, res, next) => {
  try {
    // const { error, value } = userSchema.validate(req.body);

    const { error, value } = validateUser(req.body);

    if (error) {
      throw new appError(error, BAD_REQUEST);
    }
  } catch (error) {
    next(error);
  }
};
