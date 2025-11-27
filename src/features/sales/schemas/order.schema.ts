import { z } from "zod";
import { CustomerSchema } from "./customer.schema";

export const OrderSchema = z.object({
  customer: CustomerSchema.optional(),
  customer_id: z.int().min(0, {
    message: "Solo numeros positivos son validos como id del cliente",
  }),
  status: z
    .enum(["draft", "confirmed", "shipped", "delivered", "cancelled"])
    .optional(),
  order_date: z
    .string()
    .min(8, { message: "Formato de fecha requerida dd-mm-yyyy" })
    .pipe(z.coerce.date()),
  delivery_date: z
    .string()
    .min(8, { message: "Formato de fecha requerida dd-mm-yyyy" })
    .pipe(z.coerce.date())
    .optional(),
  notes: z.string().optional(),
});

export type Order = z.infer<typeof OrderSchema>;
