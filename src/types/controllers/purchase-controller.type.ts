import { Request, Response } from "express";

export interface PurchaseControllerInterface {
  getPurchases(request: Request, response: Response): Promise<Response>;

  getPurchaseById(request: Request, response: Response): Promise<Response>;
}
