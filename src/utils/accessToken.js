import jwt from "jsonwebtoken";

export const handleAccessToken = (userId, res) => {
  const accessToken = jwt.sign({ userId }, process.env.JTW_SECRET, {
    expiresIn: "360d",
  });

  res.cookie("accessToken", accessToken, {
    maxAge: 360 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });

  return accessToken;
};
