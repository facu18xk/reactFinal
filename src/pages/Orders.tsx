import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableFooter,
} from "@/components/ui/table";

import { Pencil, Trash, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ordersApi } from "@/features/sales/api/orders.api";
import { type SaleOrder } from "@/features/sales/schemas/saleOrder.schema";

import { useEffect, useState } from "react";

export default function Orders() {
    const [orders, setOrders] = useState<SaleOrder[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchCustomers() {
            try {
                const data = await ordersApi.readAll();
                setOrders(data);
            } catch (error) {
                console.error("Error al fetchear orders: ", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchCustomers();
    }, []);

    if (isLoading) {
        return <div>Cargando.......</div>;
    }

    return !orders ? (
        <div>
            <h3>No se pudo cargar los orders</h3>
        </div>
    ) : (
        <div>
            <div className="flex flex-col lg:flex-row xl:flex-row lg:justify-between lg:items-center mb-10 gap-y-10">
                <h1 className="text-3xl font-bold">Reporte de Orders</h1>

                <Button className="bg-primary">
                    <Plus />
                    Crear un cliente
                </Button>
            </div>

            <section>
                <Table>
                    <TableCaption>Una lista de todos los Orders</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">id</TableHead>
                            <TableHead>Nombre del cliente</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                            <TableHead className="text-right">Editar</TableHead>
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
                                    <Button variant={"ghost"} className="hover:cursor-pointer">
                                        <Pencil />
                                    </Button>
                                    <Button
                                        variant={"ghost"}
                                        className="hover:cursor-pointer hover:text-destructive"
                                    >
                                        <Trash />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </section>
        </div>
    );
}
