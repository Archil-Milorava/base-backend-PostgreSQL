import { INTERNAL_SERVER_ERROR } from "../constants/http.js";

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 400;

  if (err.isOperational) {
    return res.status(statusCode).json({
      status: "failed",
      message: err.message,
    });
  }

  console.error("ERROR 💥", err);

  return res.status(INTERNAL_SERVER_ERROR).json({
    status: "failed",
    message: "Internal server error",
  });
};

export default errorHandler;
