import { z } from "zod";

export const CategorySchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Nombre requerido").max(100),
  description: z.string().optional(),
  products_count: z.number().optional(),
  created_at: z.string().pipe(z.coerce.date()).optional(),
  updated_at: z.string().pipe(z.coerce.date()).optional(),
});

export type Category = z.infer<typeof CategorySchema>;
