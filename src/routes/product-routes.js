import { ProductRepository } from "../repository/index.js";
import { Router } from "express";
import { uuidSchema, productSchema } from "../schemas/index.js";

export const productRouter = Router();

productRouter.get("/", async (req, res) => {
  const result = await new ProductRepository().getProducts();

  return res.status(200).send(result);
});

productRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  const validation = uuidSchema.safeParse(id);

  if (!validation.success) {
    return res.status(400).send(validation.error.errors);
  }

  const result = await new ProductRepository().getProductById(id);

  if (!result.length) return res.status(404).send("Produto não encontrado.");

  return res.status(200).send(result);
});

productRouter.post("/", async (req, res) => {
  const { body } = req;

  const validation = productSchema.safeParse(body);

  if (!validation.success) return res.status(400).send(validation.error.errors);

  const productColumns = ["name", "price_in_cents", "size"];

  const values = productColumns.reduce((acc, columnName) => {
    acc.push(body[columnName]);

    return acc;
  }, []);

  await new ProductRepository().createProduct(values);

  return res.status(201).send("Produto criado com sucesso!");
});

productRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const idValidation = uuidSchema.safeParse(id);

  if (!idValidation.success)
    return res.status(400).send(idValidation.error.errors);

  const searchedProduct = await new ProductRepository().getProductById(id);

  if (!searchedProduct.length)
    return res.status(404).send("Produto não encontrado.");

  const bodyValidation = productSchema.safeParse(body);

  if (!bodyValidation.success)
    return res.status(400).send(bodyValidation.error.errors);

  const columns = ["name", "price_in_cents", "size"];

  const values = columns.map((column) => body[column]);

  await new ProductRepository().updateProductById(id, values);

  return res.status(200).send("Produto editado com sucesso!");
});

productRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const validation = uuidSchema.safeParse(id);

  if (!validation.success) return res.status(400).send(validation.error.errors);

  const searchedProduct = await new ProductRepository().getProductById(id);

  if (!searchedProduct.length)
    return res.status(404).send("Produto não encontrado.");

  await new ProductRepository().deleteProductById(id);

  return res.status(200).send("Produto excluído com sucesso!");
});
