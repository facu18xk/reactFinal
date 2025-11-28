import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash, Plus, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ordersApi } from "@/features/sales/api/orders.api";
import { type SaleOrder } from "@/features/sales/schemas/saleOrder.schema";
import { type OrderData } from "@/features/sales/schemas/orders.schema";
import { useEffect, useState } from "react";
import { OrderForm } from "@/features/sales/components/OrderForm";
import { DeleteOrderModal } from "@/features/sales/components/DeleteOrderModal";
import { ConfirmSaleModal } from "@/features/sales/components/ConfirmSaleModal";

export default function Orders() {
  const [orders, setOrders] = useState<SaleOrder[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [orderToEdit, setOrderToEdit] = useState<SaleOrder | null>(null);
  const [orderToDelete, setOrderToDelete] = useState<SaleOrder | null>(null);
  const [orderToConfirm, setOrderToConfirm] = useState<SaleOrder | null>(
    null,
  );

  async function fetchOrders() {
    try {
      const data = await ordersApi.readAll();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCreate = () => {
    setOrderToEdit(null);
    setIsFormOpen(true);
  };

  const handleEdit = (order: SaleOrder) => {
    setOrderToEdit(order);
    setIsFormOpen(true);
  };

  const handleDelete = (order: SaleOrder) => {
    setOrderToDelete(order);
  };

  const handleConfirm = (order: SaleOrder) => {
    setOrderToConfirm(order);
  };

  const handleFormSubmit = async (values: OrderData) => {
    try {
      if (orderToEdit) {
        await ordersApi.update(orderToEdit.id, values);
      } else {
        await ordersApi.create(values);
      }
      await fetchOrders();
    } catch (error) {
      console.error("Error saving the order:", error);
    } finally {
      setIsFormOpen(false);
      setOrderToEdit(null);
    }
  };

  const handleDeletionConfirm = async (id: number) => {
    try {
      await ordersApi.delete(id);
      await fetchOrders();
    } catch (error) {
      console.error("Error deleting the order:", error);
    } finally {
      setOrderToDelete(null);
    }
  };

  const handleConfirmationConfirm = async (order: SaleOrder) => {
    try {
      await ordersApi.confirm(order.id, order);
      await fetchOrders();
    } catch (error) {
      console.error("Error confirming the sale:", error);
    } finally {
      setOrderToConfirm(null);
    }
  };

  if (isLoading) {
    return <div>Cargando.......</div>;
  }

  return !orders ? (
    <div>
      <h3>No se pudo cargar las órdenes</h3>
    </div>
  ) : (
    <div>
      <div className="flex flex-col lg:flex-row xl:flex-row lg:justify-between lg:items-center mb-10 gap-y-10">
        <h1 className="text-3xl font-bold">Reporte de Órdenes</h1>
        <Button className="bg-primary" onClick={handleCreate}>
          <Plus />
          Crear una orden
        </Button>
      </div>

      <section>
        <Table>
          <TableCaption>Una lista de todas las órdenes</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Nombre del cliente</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order: SaleOrder) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer?.name}</TableCell>
                <TableCell>{order.status_display}</TableCell>
                <TableCell className="text-right">
                  {order.total_amount}
                </TableCell>
                <TableCell className="text-right">
                  {order.status_display !== "Completed" && (
                    <Button
                      variant={"ghost"}
                      className="hover:cursor-pointer hover:text-green-500"
                      onClick={() => handleConfirm(order)}
                    >
                      <CheckCircle />
                    </Button>
                  )}
                  <Button
                    variant={"ghost"}
                    className="hover:cursor-pointer"
                    onClick={() => handleEdit(order)}
                  >
                    <Pencil />
                  </Button>
                  <Button
                    variant={"ghost"}
                    className="hover:cursor-pointer hover:text-destructive"
                    onClick={() => handleDelete(order)}
                  >
                    <Trash />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      {isFormOpen && (
        <OrderForm
          orderToEdit={orderToEdit}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleFormSubmit}
        />
      )}

      {orderToDelete && (
        <DeleteOrderModal
          orderToDelete={orderToDelete}
          onClose={() => setOrderToDelete(null)}
          onConfirm={handleDeletionConfirm}
        />
      )}

      {orderToConfirm && (
        <ConfirmSaleModal
          orderToConfirm={orderToConfirm}
          onClose={() => setOrderToConfirm(null)}
          onConfirm={handleConfirmationConfirm}
        />
      )}
    </div>
  );
}
