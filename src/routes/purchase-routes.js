import { Router } from "express";
import { PurchaseRepository } from "../repository/index.js";

export const purchaseRouter = Router();

purchaseRouter.get("/", async (req, res) => {
  const result = await new PurchaseRepository().getPurchases();

  return res.status(200).send(result);
});
