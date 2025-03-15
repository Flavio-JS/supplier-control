import * as React from "react";
import styled from "styled-components";

const InputStyled = styled.input`
  display: flex;
  height: 2.5rem;
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.textSecondary};
  border-radius: 0.375rem;
  background-color: ${({ theme }) => theme.colors.background};
  font-size: 1rem;
  line-height: 1.5rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  transition: border-color 0.2s, box-shadow 0.2s;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}33;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  @media (min-width: 768px) {
    font-size: 0.875rem;
  }
`;

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ type, ...props }, ref) => {
    return <InputStyled type={type} ref={ref} {...props} />;
  }
);
Input.displayName = "Input";

export { Input };
