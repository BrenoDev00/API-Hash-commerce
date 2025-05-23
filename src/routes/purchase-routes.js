import { Router } from "express";
import { PurchaseRepository } from "../repositories/index.js";
import { uuidSchema } from "../schemas/uuid-schema.js";
import {
  purchaseSchema,
  updatePurchaseSchema,
} from "../schemas/purchase-schema.js";

export const purchaseRouter = Router();

purchaseRouter.get("/", async (req, res) => {
  const result = await new PurchaseRepository().getPurchases();

  return res.status(200).send(result);
});

purchaseRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  const validation = uuidSchema.safeParse(id);

  if (!validation.success) return res.status(400).send(validation.error.errors);

  const result = await new PurchaseRepository().getPurchaseById(id);

  if (!result.length) return res.status(404).send("Compra não encontrada.");

  return res.status(200).send(result);
});

purchaseRouter.post("/", async (req, res) => {
  const { body } = req;

  const validation = purchaseSchema.safeParse(body);

  if (!validation.success) return res.status(400).send(validation.error.errors);

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

  const idValidation = uuidSchema.safeParse(id);

  if (!idValidation.success)
    return res.status(400).send(idValidation.error.errors);

  const searchedProduct = await new PurchaseRepository().getPurchaseById(id);

  if (!searchedProduct.length)
    return res.status(404).send("Compra não encontrada.");

  const bodyValidation = updatePurchaseSchema.safeParse(body);

  if (!bodyValidation.success)
    return res.status(400).send(bodyValidation.error.errors);

  const columns = ["delivery_address"];

  const values = columns.map((column) => body[column]);

  await new PurchaseRepository().updatePurchaseById(id, values);

  return res.status(200).send("Compra editada com sucesso!");
});

purchaseRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const validation = uuidSchema.safeParse(id);

  if (!validation.success) return res.status(400).send(validation.error.errors);

  const searchedPurchase = await new PurchaseRepository().getPurchaseById(id);

  if (!searchedPurchase.length)
    return res.status(404).send("Compra não encontrada.");

  await new PurchaseRepository().deletePurchaseById(id);

  return res.status(200).send("Compra excluída com sucesso!");
});
