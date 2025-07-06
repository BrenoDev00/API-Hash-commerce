import "dotenv/config";
import express, { Express } from "express";
import { userRouter, productRouter, purchaseRouter } from "./routes/index.js";
import helmet from "helmet";

const app: Express = express();

app.use(helmet());

app.use(express.json());

app.use("/users", userRouter);

app.use("/products", productRouter);

app.use("/purchases", purchaseRouter);

export default app;
