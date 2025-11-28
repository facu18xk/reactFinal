import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { type Customer } from "@/features/sales/schemas/customer.schema";

interface DeleteCustomerModalProps {
  customerToDelete: Customer | null;
  onClose: () => void;
  onConfirm: (id: number) => void;
}

export function DeleteCustomerModal({
  customerToDelete,
  onClose,
  onConfirm,
}: DeleteCustomerModalProps) {
  const isOpen = !!customerToDelete;

  const handleConfirm = () => {
    if (customerToDelete && typeof customerToDelete.id === "number") {
      onConfirm(customerToDelete.id);
    }
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estas seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer{" "}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-500"
          >
            Sí, eliminar cliente
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
