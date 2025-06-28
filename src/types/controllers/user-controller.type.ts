import { Request, Response } from "express";

export interface UserControllerInterface {
  getUsers(request: Request, response: Response): Promise<Response>;

  getUserById(request: Request, response: Response): Promise<Response>;

  getPurchaseInfoByUser(
    request: Request,
    response: Response
  ): Promise<Response>;

  createUser(request: Request, response: Response): Promise<Response>;
}
