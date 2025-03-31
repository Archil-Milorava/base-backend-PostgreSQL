const errorHandler = (err, req, res, next) => {
  console.log(err);
  
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: "failed",
      message: err.message,
    });
  }

  return res.status(500).send("Something went wrong");
};

export default errorHandler;
