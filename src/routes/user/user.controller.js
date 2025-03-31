import appError from "../../utils/errorHandler.js";





export const createUser = async (req, res, next) => {
  try {
    const { nickName, firstName, lastName, dob, email, password } = req.body;

    if (!nickName) {
      throw new appError("nick name is required", 400);
    }
  } catch (error) {
    next(error);
  }
};
