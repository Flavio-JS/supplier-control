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
  tipo: "success" | "error";
}>`
  background-color: ${({ theme, tipo }) =>
    tipo === "success" ? theme.colors.success : theme.colors.error};
  color: ${({ theme }) => theme.colors.textOnPrimary};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme, tipo }) =>
      tipo === "success" ? theme.colors.success : theme.colors.error};
    opacity: 0.9;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}33;
  }
`;

interface CustomAlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  message: string;
  type: "success" | "error";
}

export function CustomAlertDialog({
  open,
  onOpenChange,
  title,
  message,
  type,
}: CustomAlertDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <CustomAlertDialogAction tipo={type}>OK</CustomAlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
