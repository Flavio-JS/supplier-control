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
  ${({ variant, theme }) =>
    variant === "ghost"
      ? `
        background-color: transparent;
        border: 1px solid ${theme.colors.textSecondary};
        color: ${theme.colors.textPrimary};
        &:hover {
          background-color: ${theme.colors.surface};
          color: ${theme.colors.primary};
        }
      `
      : `
        background-color: ${theme.colors.primary};
        border: none;
        color: ${theme.colors.textOnPrimary};
        &:hover {
          background-color: ${theme.colors.secondary};
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
