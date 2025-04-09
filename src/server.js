import express from "express";
import "dotenv/config";
import userRoutes from "./routes/user/user.routes.js";
import errorHandler from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use("/", (req, res) =>
  res.status(200).json({ message: "Welcome to mu backend" })
);
app.use("/api/v1/user", userRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
