import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/AlertDialog/alert-dialog";
import styled from "styled-components";

const CustomAlertDialogAction = styled(AlertDialogAction)<{
  tipo: "sucesso" | "erro";
}>`
  background-color: ${({ theme, tipo }) =>
    tipo === "sucesso"
      ? theme.colors.success
      : theme.colors.error};
  color: ${({ theme }) => theme.colors.textOnPrimary};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme, tipo }) =>
      tipo === "sucesso"
        ? theme.colors.success
        : theme.colors.error};
    opacity: 0.9;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}33;
  }
`;

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
          <CustomAlertDialogAction tipo={tipo}>OK</CustomAlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
