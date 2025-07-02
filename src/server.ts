import app from "./app.js";

function bootstrap(): void {
  const port: number | string = process.env.PORT || 3000;

  app.listen(port, (): void => console.log("API rodando na porta", port));
}

bootstrap();
