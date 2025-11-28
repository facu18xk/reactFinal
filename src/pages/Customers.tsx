import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { customersApi } from "@/features/sales/api/customer.api";
import { type Customer } from "@/features/sales/schemas/customer.schema";
import { useEffect, useState } from "react";
import { CustomerForm } from "@/features/sales/components/CustomerForm";
import { DeleteCustomerModal } from "@/features/sales/components/DeleteCustomerModal";

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [customerToEdit, setCustomerToEdit] = useState<Customer | null>(null);
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(
    null,
  );

  async function fetchCustomers() {
    try {
      const data = await customersApi.readAll();
      setCustomers(data);
    } catch (error) {
      console.error("Error al fetchear customers: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleCreate = () => {
    setCustomerToEdit(null);
    setIsFormOpen(true);
  };

  const handleEdit = (customer: Customer) => {
    setCustomerToEdit(customer);
    setIsFormOpen(true);
  };

  const handleDelete = (customer: Customer) => {
    setCustomerToDelete(customer);
  };

  const handleFormSubmit = async (values) => {
    try {
      if (customerToEdit) {
        await customersApi.update(customerToEdit.id, values);
      } else {
        await customersApi.create(values);
      }
      await fetchCustomers();
    } catch (error) {
      console.error("Error al guardar el cliente:", error);
    } finally {
      setIsFormOpen(false);
      setCustomerToEdit(null);
    }
  };

  const handleDeletionConfirm = async (id: number) => {
    try {
      await customersApi.delete(id);
      await fetchCustomers();
    } catch (error) {
      console.error("Error al eliminar el cliente:", error);
    } finally {
      setCustomerToDelete(null);
    }
  };

  if (isLoading) {
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
        <Button className="bg-primary" onClick={handleCreate}>
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
              <TableHead className="text-right">Acciones</TableHead>
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
                  <Button
                    variant={"ghost"}
                    className="hover:cursor-pointer"
                    onClick={() => handleEdit(customer)}
                  >
                    <Pencil />
                  </Button>
                  <Button
                    variant={"ghost"}
                    className="hover:cursor-pointer hover:text-destructive"
                    onClick={() => handleDelete(customer)}
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
        <CustomerForm
          customerToEdit={customerToEdit}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleFormSubmit}
        />
      )}

      {customerToDelete && (
        <DeleteCustomerModal
          customerToDelete={customerToDelete}
          onClose={() => setCustomerToDelete(null)}
          onConfirm={handleDeletionConfirm}
        />
      )}
    </div>
  );
}
