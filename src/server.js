import express from "express";
import "dotenv/config";
import userRoutes from "./routes/user/user.routes.js";
import errorHandler from "./middleware/errorMiddleware.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(
  express.json({
    limit: "50mb",
  })
);

app.use("/api/v1/user", userRoutes);
app.get("*", (req, res) => {
  res.send("hello");
});

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
