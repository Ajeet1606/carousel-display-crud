import "reflect-metadata";
import { AppDataSource } from "./data-source";

import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import * as dotenv from "dotenv";
import errorMiddleware from "./middlewares/error.middleware";
import router from "./routes/router";
import * as cookieParser from "cookie-parser";
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();

export const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, 
  max: 30,
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: "Too many requests from this IP, please try again later."
});
app.use(limiter);
app.use(cookieParser());

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: "application/json" }));

const port = process.env.PORT || 80;

app.use("/api/v1", limiter, router);

app.use(errorMiddleware);

app.listen(port, async () => {
  console.info("App Started on port", { port });

  try {
    await AppDataSource.initialize();
    console.log("Database connection successful...");
  } catch (error) {
    console.error(error);
  }
});
