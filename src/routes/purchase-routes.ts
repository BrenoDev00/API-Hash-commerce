import { Router, Request, Response } from "express";
import { PurchaseController } from "../controllers/purchase-controller.js";

export const purchaseRouter: Router = Router();

purchaseRouter.get(
  "/",
  async (request: Request, response: Response): Promise<void> => {
    await new PurchaseController().getPurchases(request, response);
  }
);

purchaseRouter.get(
  "/:id",
  async (
    request: Request<{ id: string }>,
    response: Response
  ): Promise<void> => {
    await new PurchaseController().getPurchaseById(request, response);
  }
);

purchaseRouter.post(
  "/:productId/:productAmmount",
  async (
    request: Request<{ productId: string; productAmmount: string }>,
    response: Response
  ): Promise<void> => {
    await new PurchaseController().createPurchase(request, response);
  }
);

// purchaseRouter.put("/:id/:productAmmount", async (request, response) => {
//   return await new PurchaseController().updatePurchaseById(request, response);
// });

// purchaseRouter.delete("/:id", async (request, response) => {
//   return await new PurchaseController().deletePurchaseById(request, response);
// });
