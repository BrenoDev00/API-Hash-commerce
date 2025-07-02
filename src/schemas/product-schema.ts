import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3).max(120),
  priceInCents: z.number().positive(),
  size: z.string(),
});

export const productAmmountSchema = z.number().int().min(1);
