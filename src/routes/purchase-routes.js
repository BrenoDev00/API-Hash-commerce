import { Router } from "express";
import { PurchaseRepository } from "../repository/index.js";

export const purchaseRouter = Router();

purchaseRouter.get("/", async (req, res) => {
  const result = await new PurchaseRepository().getPurchases();

  return res.status(200).send(result);
});

purchaseRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await new PurchaseRepository().getPurchaseById(id);

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

purchaseRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const columns = ["delivery_address"];

  const values = columns.map((column) => body[column]);

  await new PurchaseRepository().updatePurchaseById(id, values);

  return res.status(200).send("Compra editada com sucesso!");
});

purchaseRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  await new PurchaseRepository().deletePurchaseById(id);

  return res.status(200).send("Compra excluída com sucesso!");
});
