import { z } from "zod";

export const OrderItemSchema = z.object({
  product: z.number().min(0, { message: "No hoy productos con id negativos" }),
  product_name: z
    .string()
    .min(2, {
      message: "Como minimo el producto tiene que tener 2 caracteres",
    })
    .optional(),
  product_sku: z
    .string()
    .min(2, {
      message: "Como minimo el sku tiene que tener 2 caracteres",
    })
    .optional(),
  quantity: z.int(),
  unit_price: z
    .string()
    .min(1, { message: "Minimo 1 numero" })
    .pipe(z.coerce.date()),
  total_price: z
    .string()
    .min(1, { message: "Minimo 1 numero" })
    .pipe(z.coerce.number())
    .optional(),
  created_at: z
    .string()
    .min(8, { message: "Formato de fecha requerida dd-mm-yyyy" })
    .pipe(z.coerce.date())
    .optional(),
});

export type OrderItem = z.infer<typeof OrderItemSchema>;
