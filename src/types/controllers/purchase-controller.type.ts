import { Request, Response } from "express";

export interface PurchaseControllerInterface {
  getPurchases(request: Request, response: Response): Promise<Response>;

  getPurchaseById(request: Request, response: Response): Promise<Response>;

  createPurchase(request: Request, response: Response): Promise<Response>;

  updatePurchaseById(request: Request, response: Response): Promise<Response>;

  deletePurchaseById(request: Request, response: Response): Promise<Response>;
}
