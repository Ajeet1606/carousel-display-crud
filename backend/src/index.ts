import "reflect-metadata";
import { AppDataSource } from "./data-source";

import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import * as dotenv from "dotenv";
import errorMiddleware from "./middlewares/error.middleware";
import router from "./routes/router";
import * as cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(cookieParser());

app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: "application/json" }));

const port = process.env.PORT || 80;

app.use("/api/v1", router);

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
