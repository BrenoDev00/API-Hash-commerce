import { Router } from "express";
import { PurchaseController } from "../controllers/purchase-controller.js";

export const purchaseRouter = Router();

purchaseRouter.get("/", async (request, response) => {
  return await new PurchaseController().getPurchases(request, response);
});

purchaseRouter.get("/:id", async (request, response) => {
  return await new PurchaseController().getPurchaseById(request, response);
});

purchaseRouter.post("/", async (request, response) => {
  return await new PurchaseController().createPurchase(request, response);
});

purchaseRouter.put("/:id", async (request, response) => {
  return await new PurchaseController().updatePurchaseById(request, response);
});

purchaseRouter.delete("/:id", async (request, response) => {
  return await new PurchaseController().deletePurchaseById(request, response);
});
