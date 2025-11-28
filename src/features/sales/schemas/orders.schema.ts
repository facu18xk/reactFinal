import { z } from "zod";

export const OrderItemFormSchema = z.object({
  product: z
    .number()
    .min(1, "El ID del producto es requerido")
    .nullable()
    .refine((val) => val !== null, { message: "El producto es requerido" }),
  quantity: z
    .number()
    .min(1, "La cantidad debe ser al menos 1")
    .nullable()
    .refine((val) => val !== null, { message: "La cantidad es requerida" }),
  unit_price: z
    .number()
    .min(0, "El precio unitario no puede ser negativo")
    .nullable()
    .refine((val) => val !== null, { message: "El precio unitario es requerido" }),
});

export const OrderSchema = z.object({
  customer_id: z.number().min(1, { message: "El cliente es requerido" }),
  order_date: z
    .string()
    .min(8, { message: "Formato de fecha requerida dd-mm-yyyy" })
    .pipe(z.coerce.date()),
  delivery_date: z
    .string()
    .min(8, { message: "Formato de fecha requerida dd-mm-yyyy" })
    .pipe(z.coerce.date())
    .optional()
    .nullable(),
  notes: z.string().optional(),
  items: z.array(OrderItemFormSchema).min(1, "La orden debe tener al menos un item"),
});

export type OrderData = z.infer<typeof OrderSchema>;
