
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { OrderSchema, type OrderData } from "../schemas/orders.schema";
import { type SaleOrder } from "../schemas/saleOrder.schema";
import { type Customer } from "../schemas/customer.schema";
import { customersApi } from "../api/customer.api";
import { Trash, Plus } from "lucide-react";

interface OrderFormProps {
  orderToEdit: SaleOrder | null;
  onClose: () => void;
  onSubmit: (values: OrderData) => void;
}

export function OrderForm({ orderToEdit, onClose, onSubmit }: OrderFormProps) {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const data = await customersApi.readAll();
        setCustomers(data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    }
    fetchCustomers();
  }, []);

  const form = useForm<OrderData>({
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      customer_id: orderToEdit?.customer?.id,
      order_date: orderToEdit?.order_date
        ? new Date(orderToEdit.order_date).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      delivery_date: orderToEdit?.delivery_date
        ? new Date(orderToEdit.delivery_date).toISOString().split("T")[0]
        : null,
      notes: orderToEdit?.notes || "",
      items:
        orderToEdit?.items.map((item) => ({
          product: item.product,
          quantity: item.quantity,
        })) || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const {
    formState: { isSubmitting },
  } = form;

  const handleTransformedSubmit = (data: OrderData) => {
    onSubmit(data);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>
            {orderToEdit ? "Editar Orden" : "Crear Orden"}
          </DialogTitle>
          <DialogDescription>
            Complete los detalles de la orden. Haga clic en guardar cuando haya
            terminado.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleTransformedSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="customer_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cliente</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    defaultValue={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un cliente" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {customers.map((customer) => (
                        <SelectItem
                          key={customer.id}
                          value={customer.id.toString()}
                        >
                          {customer.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="order_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha de Orden</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="delivery_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha de Entrega</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notas</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Notas de la orden" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium">Items</h3>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => append({ product: null, quantity: 1, unit_price: 0 })}
                >
                  <Plus className="mr-2 h-4 w-4" /> Agregar Item
                </Button>
              </div>
                          <div className="space-y-2">
                              {fields.map((field, index) => (
                                <div
                                  key={field.id}
                                  className="flex items-center gap-2 p-2 border rounded-lg"
                                >
                                  <FormField
                                    control={form.control}
                                    name={`items.${index}.product`}
                                    render={({ field }) => (
                                      <FormItem className="flex-1">
                                        <FormLabel>ID Producto</FormLabel>
                                        <FormControl>
                                          <Input
                                            type="number"
                                            placeholder="ID"
                                            {...field}
                                            onChange={(e) => {
                                              const value = e.target.value;
                                              field.onChange(
                                                value === "" ? null : parseInt(value, 10),
                                              );
                                            }}
                                          />
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                                      <FormField
                                                        control={form.control}
                                                        name={`items.${index}.quantity`}
                                                        render={({ field }) => (
                                                          <FormItem>
                                                            <FormLabel>Cantidad</FormLabel>
                                                            <FormControl>
                                                              <Input
                                                                type="number"
                                                                placeholder="Cant."
                                                                {...field}
                                                                onChange={(e) => {
                                                                  const value = e.target.value;
                                                                  field.onChange(
                                                                    value === "" ? null : parseInt(value, 10),
                                                                  );
                                                                }}
                                                              />
                                                            </FormControl>
                                                          </FormItem>
                                                        )}
                                                      />
                                                      <FormField
                                                        control={form.control}
                                                        name={`items.${index}.unit_price`}
                                                        render={({ field }) => (
                                                          <FormItem>
                                                            <FormLabel>Precio Unitario</FormLabel>
                                                            <FormControl>
                                                              <Input
                                                                type="number"
                                                                placeholder="Precio"
                                                                {...field}
                                                                onChange={(e) => {
                                                                  const value = e.target.value;
                                                                  field.onChange(
                                                                    value === "" ? null : parseFloat(value),
                                                                  );
                                                                }}
                                                              />
                                                            </FormControl>
                                                          </FormItem>
                                                        )}
                                                      />                                  <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    onClick={() => remove(index)}
                                    className="self-end"
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
              <FormField
                control={form.control}
                name="items"
                render={() => (
                  <FormItem>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cerrar
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? "Guardando..."
                  : orderToEdit
                  ? "Guardar Cambios"
                  : "Crear"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
