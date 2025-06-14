import { Router } from "express";
import { UserController } from "../controllers/user-controller.js";

export const userRouter = Router();

userRouter.get("/", async (request, response) => {
  return await new UserController().getUsers(request, response);
});

userRouter.get("/purchase-info", async (request, response) => {
  return await new UserController().getPurchaseInfoByUser(request, response);
});

userRouter.get("/:id", async (request, response) => {
  return await new UserController().getUserById(request, response);
});

userRouter.post("/", async (request, response) => {
  return await new UserController().createUser(request, response);
});

userRouter.put("/:id", async (request, response) => {
  return await new UserController().updateUserById(request, response);
});

userRouter.delete("/:id", async (request, response) => {
  return await new UserController().deleteUserById(request, response);
});
