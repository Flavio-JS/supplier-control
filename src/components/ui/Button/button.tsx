import styled from "styled-components";

export interface ButtonProps {
  variant?: "primary" | "ghost";
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  children: React.ReactNode;
}

export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;

  /* Variantes */
  ${({ variant }) =>
    variant === "ghost"
      ? `
        background-color: transparent;
        border: 1px solid #e2e8f0;
        color: #4a5568;
        &:hover {
          background-color: #f7fafc;
        }
      `
      : `
        background-color: #3182ce;
        border: none;
        color: white;
        &:hover {
          background-color: #2c5282;
        }
      `}

  /* Tamanhos */
  ${({ size }) =>
    size === "small"
      ? `
        padding: 0.25rem 0.5rem;
        font-size: 0.875rem;
      `
      : size === "large"
      ? `
        padding: 0.75rem 1.5rem;
        font-size: 1.125rem;
      `
      : `
        padding: 0.5rem 1rem;
        font-size: 1rem;
      `}
`;
