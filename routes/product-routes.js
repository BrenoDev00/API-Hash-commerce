import { ProductRepository } from "../repository/product-repository.js";
import { Router } from "express";

export const productRouter = Router();

productRouter.get("/", async (req, res) => {
  const result = await new ProductRepository().getProducts();

  return res.status(200).send(result);
});

productRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await new ProductRepository().getProductById(id);

  return res.status(200).send(result);
});
