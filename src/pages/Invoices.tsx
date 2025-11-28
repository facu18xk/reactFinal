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
import { invoicesApi } from "@/features/sales/api/invoices.api";
import { type Invoice } from "@/features/sales/schemas/invoice.schema";
import { useEffect, useState } from "react";

export default function Invoices() {
    const [invoices, setInvoices] = useState<Invoice[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchInvoices() {
            try {
                const data = await invoicesApi.readAll();
                setInvoices(data);
            } catch (error) {
                console.error("Error al fetchear invoices: ", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchInvoices();
    }, []);

    if (isLoading) {
        return <div>Cargando.......</div>;
    }

    return !invoices ? (
        <div>
            <h3>No se pudo cargar los clientes</h3>
        </div>
    ) : (
        <div>
            <div className="flex flex-col lg:flex-row xl:flex-row lg:justify-between lg:items-center mb-10 gap-y-10">
                <h1 className="text-3xl font-bold">Reporte de invoices</h1>

                <Button className="bg-primary">
                    <Plus />
                    Crear un invoice
                </Button>
            </div>

            <section>
                <Table>
                    <TableCaption>Una lista de todos los invoices</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Numero</TableHead>
                            <TableHead>Orden de venta</TableHead>
                            <TableHead>Nombre del cliente</TableHead>
                            <TableHead className="text-right">Fecha</TableHead>
                            <TableHead className="text-right">Cantidad</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {invoices.map((invoice: Invoice) => (
                            <TableRow key={invoice.id}>
                                <TableCell className="font-medium">
                                    {invoice.invoice_number}
                                </TableCell>
                                <TableCell>{invoice.sale_order}</TableCell>
                                <TableCell>{invoice.customer_name}</TableCell>
                                <TableCell className="text-right">
                                    {invoice.invoice_date.toLocaleString()}
                                </TableCell>
                                <TableCell>{invoice.amount}</TableCell>
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
