import { Plus } from "lucide-react";
import { Button } from "../ui/Button/button";
import styled from "styled-components";

const NewButton = styled(Button)`
  width: 100%;

  @media (min-width: 640px) {
    width: auto;
  }
`;

interface NewSupplierButtonProps {
  onClick: () => void;
}

export function NewSupplierButton({ onClick }: NewSupplierButtonProps) {
  return (
    <NewButton onClick={onClick}>
      <Plus /> Novo Fornecedor
    </NewButton>
  );
}
