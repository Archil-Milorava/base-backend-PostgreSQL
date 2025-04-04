import appError from "../../utils/errorHandler.js";
import { BAD_REQUEST, CREATED, OK } from "../../constants/http.js";
import { logInValidator, signUpValidator } from "../../utils/validators.js";
import prisma from "../../utils/prisma.js";
import { hashPassword, comparePassword } from "../../utils/hashPassword.js";
import { handleAccessToken } from "../../utils/accessToken.js";

export const createUser = async (req, res, next) => {
  try {
    const { error, value } = signUpValidator(req.body);
    const { id, nickName, email, password, profileImage } = value;

    if (error) {
      throw new appError(error, BAD_REQUEST);
    }

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      throw new appError("The email already exists", BAD_REQUEST);
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        email,
        nickName,
        password: hashedPassword,
        profileImage,
      },
    });

    res.status(CREATED).json({
      status: "success",
      message: "registered successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { error, value } = logInValidator(req.body);

    const { nickName, password } = value;

    if (error) {
      throw new appError("all fields required", BAD_REQUEST);
    }

    const user = await prisma.user.findUnique({ where: { nickName } });

    if (!user) {
      throw appError("Wrong Credentials", BAD_REQUEST);
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new appError("Invalid credentials");
    }

    handleAccessToken(user.id, res);

    res.status(OK).json({
      user: {
        id: user.id,
        nickName: user.nickName,
        email: user.email,
        profileImage: user.profileImage,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.cookie("accessToken", "", { maxAge: 0 });
    res.status(OK).json({
      status: "success",
      message: "loged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const currentUser = req.user;

    res.status(OK).json({
      currentUser,
    });
  } catch (error) {
    next(error);
  }
};
