import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import styled from "styled-components";
import { Button } from "../Button/button";

// Estilos para o AlertDialogOverlay
const AlertDialogOverlay = styled(AlertDialogPrimitive.Overlay)`
  position: fixed;
  inset: 0;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.2s ease-out;

  &[data-state="closed"] {
    animation: fadeOut 0.2s ease-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

// Estilos para o AlertDialogContent
const AlertDialogContent = styled(AlertDialogPrimitive.Content)`
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 50;
  width: 100%;
  max-width: 32rem;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: slideIn 0.2s ease-out;

  &[data-state="closed"] {
    animation: slideOut 0.2s ease-out;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translate(-50%, -48%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }

  @keyframes slideOut {
    from {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
    to {
      opacity: 0;
      transform: translate(-50%, -48%);
    }
  }
`;

// Estilos para o AlertDialogHeader
const AlertDialogHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;

  @media (min-width: 640px) {
    text-align: left;
  }
`;

// Estilos para o AlertDialogFooter
const AlertDialogFooter = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: 0.5rem;

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: flex-end;
    gap: 0.5rem;
  }
`;

// Estilos para o AlertDialogTitle
const AlertDialogTitle = styled(AlertDialogPrimitive.Title)`
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.75rem;
  letter-spacing: -0.025em;
`;

// Estilos para o AlertDialogDescription
const AlertDialogDescription = styled(AlertDialogPrimitive.Description)`
  font-size: 0.875rem;
  color: #6b7280;
`;

// Componente AlertDialog (raiz)
const AlertDialog = AlertDialogPrimitive.Root;

// Componente AlertDialogTrigger
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

// Componente AlertDialogPortal
const AlertDialogPortal = AlertDialogPrimitive.Portal;

// Componente AlertDialogAction
const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ ...props }, ref) => (
  <AlertDialogPrimitive.Action ref={ref} asChild {...props}>
    <Button>{props.children}</Button>
  </AlertDialogPrimitive.Action>
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

// Componente AlertDialogCancel
const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ ...props }, ref) => (
  <AlertDialogPrimitive.Cancel ref={ref} asChild {...props}>
    <Button variant="ghost">{props.children}</Button>
  </AlertDialogPrimitive.Cancel>
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

// Exportação dos componentes
export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogTrigger,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
