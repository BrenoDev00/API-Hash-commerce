import { Request, Response } from "express";

export interface ProductControllerInterface {
  getProducts(request: Request, response: Response): Promise<Response>;

  getProductById(request: Request, response: Response): Promise<Response>;
}
