import jwt from "jsonwebtoken";
import { BAD_REQUEST, UNAUTHORIZED } from "../constants/http.js";
import appError from "../utils/errorHandler.js";
import prisma from "../utils/prisma.js";

export const protectRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies?.accessToken;

    if (!accessToken) {
      throw new appError("Please log in first", UNAUTHORIZED);
    }

    const decoded = jwt.verify(accessToken, process.env.JTW_SECRET);

    const currentUser = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        nickName: true,
        email: true,
        profileImage: true,
        createdAt: true,
      },
    });

    if (!currentUser) {
      throw new appError("User Not Found", BAD_REQUEST);
    }

    req.user = currentUser;

    next();
  } catch (error) {
    next(error);
  }
};
