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
import { type SaleOrder } from "../schemas/saleOrder.schema";

interface ConfirmSaleModalProps {
  orderToConfirm: SaleOrder;
  onClose: () => void;
  onConfirm: (order: SaleOrder) => void;
}

export function ConfirmSaleModal({
  orderToConfirm,
  onClose,
  onConfirm,
}: ConfirmSaleModalProps) {
  return (
    <AlertDialog open onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar Venta</AlertDialogTitle>
          <AlertDialogDescription>
            ¿Estás seguro que quieres confirmar la venta para la orden{" "}
            <span className="font-bold">{orderToConfirm.id}</span>? Esta acción
            no se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => onConfirm(orderToConfirm)}>
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
