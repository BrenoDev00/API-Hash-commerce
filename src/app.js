import "dotenv/config";
import express from "express";
import { userRouter, productRouter } from "./routes/index.js";

import helmet from "helmet";

const app = express();

app.use(helmet());

app.use(express.json());

app.use("/users", userRouter);

app.use("/products", productRouter);

function bootstrap() {
  const port = 3001;

  app.listen(port, () => console.log("API rodando na porta", port));
}

bootstrap();
