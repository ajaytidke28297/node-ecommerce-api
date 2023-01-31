require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

// Extra packages
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Database
const connectDB = require("./db/connect");

// routers
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");

// Middleware
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(cors());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, console.log(`Listening on port ${PORT}`));
  } catch (error) {
    console.log("Error ", error);
  }
};

start();
