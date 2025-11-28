import { z } from "zod";
import { CategorySchema } from "./category.schema";

export const ProductSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Nombre requerido").max(200),
  description: z.string().optional().nullable(),
  sku: z.string().max(50).optional().nullable(),
  category: CategorySchema.optional().nullable(),
  category_id: z.coerce.number().int().positive().optional().nullable(),
  price: z.coerce
    .number()
    .positive({ message: "tiene que ser positivo(good vibes only)" }),
  cost_price: z.coerce
    .number()
    .positive({ message: "tiene que ser positivo(good vibes only)" })
    .optional()
    .nullable(),
  stock_quantity: z.coerce.number().int().default(0),
  min_stock_level: z.coerce.number().int().optional().nullable(),
  max_stock_level: z.coerce.number().int().optional().nullable(),
  is_active: z.boolean().default(true),
  stock_status: z.string().optional(),
  created_by_name: z.string().optional(),
  created_at: z.string().pipe(z.coerce.date()).optional(),
  updated_at: z.string().pipe(z.coerce.date()).optional(),
});

export type Product = z.infer<typeof ProductSchema>;
