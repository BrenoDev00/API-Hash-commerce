import { Router } from "express";
import { PurchaseRepository } from "../repository/index.js";

export const purchaseRouter = Router();

purchaseRouter.get("/", async (req, res) => {
  const result = await new PurchaseRepository().getPurchases();

  return res.status(200).send(result);
});

purchaseRouter.post("/", async (req, res) => {
  const { body } = req;

  const purchaseColumns = ["delivery_address", "user_id"];

  const values = purchaseColumns.reduce((acc, columnName) => {
    acc.push(body[columnName]);

    return acc;
  }, []);

  await new PurchaseRepository().createPurchase(values);

  return res.status(201).send("Compra adicionada com sucesso!");
});
