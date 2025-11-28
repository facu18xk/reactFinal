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
import { useEffect, useState } from "react";

export default function CrudView({ isLoading: boolean }) {
  if (boolean) {
    return <div>Cargando.......</div>;
  }

  return !customers ? (
    <div>
      <h3>No se pudo cargar los clientes</h3>
    </div>
  ) : (
    <div>
      <div className="flex flex-col lg:flex-row xl:flex-row lg:justify-between lg:items-center mb-10 gap-y-10">
        <h1 className="text-3xl font-bold">Reporte de clientes</h1>

        <Button className="bg-primary">
          <Plus />
          Crear un cliente
        </Button>
      </div>

      <section>
        <Table>
          <TableCaption>Una lista de todos los clientes</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefono</TableHead>
              <TableHead className="text-right">Direccion</TableHead>
              <TableHead className="text-right">Editar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer: Customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell className="text-right">{customer.address}</TableCell>
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
