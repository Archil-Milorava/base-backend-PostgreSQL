import appError from "../../utils/errorHandler.js";
import { BAD_REQUEST, CREATED, OK } from "../../constants/http.js";
import { logInValidator, signUpValidator } from "../../utils/validators.js";
import prisma from "../../utils/prisma.js";
import { hashPassword, comparePassword } from "../../utils/hashPassword.js";
import { handleAccessToken } from "../../utils/accessToken.js";
import crypto from "crypto";
import { sendEmail } from "../../utils/sendEmail.js";

export const createUser = async (req, res, next) => {
  try {
    const { error, value } = signUpValidator(req.body);
    const { id, nickName, email, password, profileImage } = value;

    if (error) {
      throw new appError(error, BAD_REQUEST);
    }

    const emailExists = await prisma.user.findUnique({
      where: { email },
    });

    const nickNameExists = await prisma.user.findUnique({
      where: { nickName },
    });

    if (emailExists || nickNameExists) {
      throw new appError("The email or nick name already exists", BAD_REQUEST);
    }

    const hashedPassword = await hashPassword(password);

    await prisma.user.create({
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

export const getCurrentUser = async (req, res, next) => {
  try {
    const currentUser = req.user;

    res.status(OK).json({
      currentUser,
    });
  } catch (error) {
    next(error);
  }
};

export const handleForgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new appError("Please enter email first", BAD_REQUEST);
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res
        .status(200)
        .json({ message: "Reset link sent to the entered email address" });
    }

    const resetToken = crypto.randomBytes(4).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    await prisma.user.update({
      where: { email },
      data: {
        resetToken: hashedToken,
        resetTokenExpiry: new Date(Date.now() + 1000 * 60 * 15), // 15 mins
      },
    });

    await sendEmail(email, resetToken);

    res
      .status(200)
      .json({ message: "Reset link sent to the entered email address" });
  } catch (error) {
    next(error);
  }
};

export const handleResetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await prisma.user.findFirst({
      where: {
        resetToken: hashedToken,
        resetTokenExpiry: {
          gte: new Date(),
        },
      },
    });

    if (!user) {
      throw new appError("Token is invalid or expired", 400);
    }

    const hashedPassword = await hashPassword(newPassword);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    next(error);
  }
}