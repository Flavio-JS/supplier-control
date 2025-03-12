import * as DialogPrimitive from "@radix-ui/react-dialog";
import styled from "styled-components";

// Estilos para o overlay (fundo escuro)
const DialogOverlay = styled(DialogPrimitive.Overlay)`
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

// Estilos para o conteúdo do modal
const DialogContent = styled(DialogPrimitive.Content)`
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

// Estilos para o botão de fechar
const DialogCloseButton = styled(DialogPrimitive.Close)`
  position: absolute;
  right: 1rem;
  top: 1rem;
  padding: 0.5rem;
  border-radius: 0.25rem;
  opacity: 0.7;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }
`;

// Estilos para o cabeçalho
const DialogHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;

  @media (min-width: 640px) {
    text-align: left;
  }
`;

// Estilos para o rodapé
const DialogFooter = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: 0.5rem;

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: flex-end;
    gap: 0.5rem;
  }
`;

// Estilos para o título
const DialogTitle = styled(DialogPrimitive.Title)`
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.75rem;
  letter-spacing: -0.025em;
`;

// Estilos para a descrição
const DialogDescription = styled(DialogPrimitive.Description)`
  font-size: 0.875rem;
  color: #6b7280;
`;

// Componente Dialog (raiz)
const Dialog = DialogPrimitive.Root;

// Componente DialogTrigger
const DialogTrigger = DialogPrimitive.Trigger;

// Componente DialogPortal
const DialogPortal = DialogPrimitive.Portal;

// Componente DialogClose
const DialogClose = DialogPrimitive.Close;

// Exportação dos componentes
export {
  Dialog,
  DialogPortal,
  DialogTrigger,
  DialogOverlay,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogCloseButton,
};
