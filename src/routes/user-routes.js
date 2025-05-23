import { UserRepository } from "../repositories/user-repository.js";
import { Router } from "express";
import { userSchema } from "../schemas/user-schema.js";
import { uuidSchema } from "../schemas/uuid-schema.js";

export const userRouter = Router();

userRouter.get("/", async (req, res) => {
  const result = await new UserRepository().getUsers();

  return res.status(200).send(result);
});

userRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  const validation = uuidSchema.safeParse(id);

  if (!validation.success) return res.status(400).send(validation.error.errors);

  const result = await new UserRepository().getUserById(id);

  if (!result.length) return res.status(404).send("Usuário não encontrado.");

  return res.status(200).send(result);
});

userRouter.post("/", async (req, res) => {
  const { body } = req;

  const validation = userSchema.safeParse(body);

  if (!validation.success) return res.status(400).send(validation.error.errors);

  const userColumns = ["name", "surname", "email"];

  const values = userColumns.reduce((acc, columnName) => {
    acc.push(body[columnName]);
    return acc;
  }, []);

  await new UserRepository().createUser(values);

  return res.status(201).send("Usuário criado com sucesso!");
});

userRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const idValidation = uuidSchema.safeParse(id);

  if (!idValidation.success)
    return res.status(400).send(idValidation.error.errors);

  const searchedUser = await new UserRepository().getUserById(id);

  if (!searchedUser.length)
    return res.status(404).send("Usuário não encontrado.");

  const bodyValidation = userSchema.safeParse(body);

  if (!bodyValidation.success)
    return res.status(400).send(bodyValidation.error.errors);

  const columns = ["name", "surname", "email"];

  const values = columns.map((column) => body[column]);

  await new UserRepository().updateUserById(id, values);

  return res.status(200).send("Usuário editado com sucesso!");
});

userRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const validation = uuidSchema.safeParse(id);

  if (!validation.success) return res.status(400).send(validation.error.errors);

  const searchedUser = await new UserRepository().getUserById(id);

  if (!searchedUser.length)
    return res.status(404).send("Usuário não encontrado.");

  await new UserRepository().deleteUserById(id);

  return res.status(200).send("Usuário excluído com sucesso!");
});
