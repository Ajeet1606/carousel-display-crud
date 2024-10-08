import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : 3306,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging: ["error"],
  entities: ["src/entity/*.ts", "src/entity/*.js"],
  migrations: ["src/migration/*.ts", "src/migration/*.js"],
  // extra: {
  //   timezone: "Z", // Use UTC timezone
  // },
});
