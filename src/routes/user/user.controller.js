import appError from "../../utils/errorHandler.js";
import { BAD_REQUEST, OK } from "../../constants/http.js";
import { validateUser } from "../../utils/validators.js";
import prisma from "../../utils/prisma.js";

export const createUser = async (req, res, next) => {
  try {
    const { error, value } = validateUser(req.body);
    const { id, nickName, email, password, profileImage } = value;

    if (error) {
      throw new appError(error, BAD_REQUEST);
    }

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      throw new appError("User already exists", BAD_REQUEST);
    }

    const newUser = await prisma.user.create({
      data: {
        email,
        nickName,
        password,
        profileImage,
      },
    });

    res.status(OK).json({
      newUser,
    });
  } catch (error) {
    next(error);
  }
};
