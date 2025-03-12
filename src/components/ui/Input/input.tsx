import * as React from "react";
import styled from "styled-components";

// Estilos para o Input
const InputStyled = styled.input`
  display: flex;
  height: 2.5rem;
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  background-color: white;
  font-size: 1rem;
  line-height: 1.5rem;
  color: #1a202c;
  transition: border-color 0.2s, box-shadow 0.2s;

  &::placeholder {
    color: #a0aec0;
  }

  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 2px rgba(49, 130, 206, 0.2);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  @media (min-width: 768px) {
    font-size: 0.875rem;
  }
`;

// Componente Input
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ type, ...props }, ref) => {
    return (
      <InputStyled type={type} ref={ref} {...props} />
    );
  }
);
Input.displayName = "Input";

// Exportação do componente
export { Input };
