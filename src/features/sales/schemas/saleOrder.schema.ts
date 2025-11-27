import { z } from "zod";
import { CustomerSchema } from "./customer.schema";
import { OrderItemSchema } from "./orderItem.schema";

export const SaleOrderSchema = z.object({
    id: z
        .int()
        .optional(),
    order_number: z
        .string()
        .min(1, { message: "Minimo un caracter para el numero de orden" })
        .optional(),
    customer: CustomerSchema.optional(),
    customer_id: z.int().min(0, {
        message: "Solo numeros positivos son validos como id del cliente",
    }),
    status: z
        .enum(["draft", "confirmed", "shipped", "delivered", "cancelled"])
        .optional(),
    status_display: z
        .string()
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
    subtotal: z
        .string()
        .pipe(z.coerce.number()),
    tax_amount: z
        .string()
        .pipe(z.coerce.number()),
    total_amount: z
        .string()
        .pipe(z.coerce.number()),

    notes: z.string().optional(),
    items: z.array(OrderItemSchema),
    created_by_name: z
        .string()
        .optional(),
    created_at: z
        .string()
        .pipe(z.coerce.date())
        .optional(),
    updated_at: z
        .string()
        .pipe(z.coerce.date())
        .optional()
});

export type SaleOrder = z.infer<typeof SaleOrderSchema>;

