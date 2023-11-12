import "dotenv/config";
import "express-async-errors";
import express from "express";
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import { router as authRouter } from "./routes/auth.js";
import { router as jobsRouter } from "./routes/jobs.js";
import connectDB from "./db/connect.js";
import authMid from "./middleware/authentication.js";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import xss from "xss";

const app = express();
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15min
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authMid, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5174;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
