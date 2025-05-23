import { Router } from "express";
import { ProductController } from "../controllers/product-controller.js";

export const productRouter = Router();

productRouter.get("/", async (request, response) => {
  return await new ProductController().getProducts(request, response);
});

productRouter.get("/:id", async (request, response) => {
  return await new ProductController().getProductById(request, response);
});

productRouter.post("/", async (request, response) => {
  return await new ProductController().createProduct(request, response);
});

productRouter.put("/:id", async (request, response) => {
  return await new ProductController().updateProductById(request, response);
});

productRouter.delete("/:id", async (request, response) => {
  return await new ProductController().deleteProductById(request, response);
});
