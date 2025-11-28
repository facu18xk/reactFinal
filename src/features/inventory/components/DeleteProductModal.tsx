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
import { type Product } from "@/features/inventory/schemas/product.schema";

interface DeleteProductModalProps {
  productToDelete: Product | null;
  onClose: () => void;
  onConfirm: (id: number) => void;
}

export function DeleteProductModal({
  productToDelete,
  onClose,
  onConfirm,
}: DeleteProductModalProps) {
  const isOpen = !!productToDelete;

  const handleConfirm = () => {
    if (productToDelete && typeof productToDelete.id === "number") {
      onConfirm(productToDelete.id);
    }
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Estas seguro?</AlertDialogTitle>
          <AlertDialogDescription>Accion permanente</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-500"
          >
            Si
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
