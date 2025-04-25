import { Router } from "express";
import { UserRepository } from "../repository/user-repository.js";

export const userRouter = Router();

userRouter.get("/", async (req, res) => {
  const result = await new UserRepository().getUsers();

  return res.status(200).send(result);
});

userRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await new UserRepository().getUserById(id);

  return res.status(200).send(result);
});

userRouter.post("/", async (req, res) => {
  const { body } = req;

  const userColumns = ["name", "surname", "email"];

  const values = userColumns.reduce((acc, columnName) => {
    acc.push(body[columnName]);
    return acc;
  }, []);

  await new UserRepository().createUser(values);

  return res.status(201).send("Usuário criado com sucesso!");
});
