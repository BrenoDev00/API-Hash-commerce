import { z } from "zod";
import { uuidSchema } from "./uuid-schema.js";

export const purchaseSchema = z.object({
  deliveryAddress: z.string().min(3),
  userId: uuidSchema,
});

export const updatePurchaseSchema = z.object({
  deliveryAddress: z.string().min(3),
});
