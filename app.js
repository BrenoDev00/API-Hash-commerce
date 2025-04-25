import "dotenv/config";
import express from "express";
import { userRouter } from "./routes/user-routes.js";

const app = express();

app.use(express.json());

app.use("/users", userRouter);

function bootstrap() {
  try {
    app.listen(3001, () => console.log("API rodando na porta 3001"));
  } catch (error) {
    console.error("Não foi possível executar a API: ", error);
  }
}

bootstrap();
