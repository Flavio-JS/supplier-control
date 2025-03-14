import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/AlertDialog/alert-dialog";

interface CustomAlertDialogProps {
  aberto: boolean;
  onOpenChange: (open: boolean) => void;
  titulo: string;
  mensagem: string;
  tipo: "sucesso" | "erro";
}

export function CustomAlertDialog({
  aberto,
  onOpenChange,
  titulo,
  mensagem,
  tipo,
}: CustomAlertDialogProps) {
  return (
    <AlertDialog open={aberto} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{titulo}</AlertDialogTitle>
          <AlertDialogDescription>{mensagem}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            style={{
              backgroundColor: tipo === "sucesso" ? "#10B981" : "#EF4444",
            }}
          >
            OK
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
