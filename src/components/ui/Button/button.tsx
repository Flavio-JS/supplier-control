import styled from "styled-components";

export interface ButtonProps {
  variant?: "primary" | "ghost" | "outline";
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
  transition: background-color 0.2s, color 0.2s, border-color 0.2s;

  ${({ variant, theme }) => {
    switch (variant) {
      case "ghost":
        return `
          background-color: transparent;
          border: 1px solid transparent;
          color: ${theme.colors.textPrimary};
          &:hover {
            background-color: ${theme.colors.surface};
            color: ${theme.colors.primary};
          }
        `;
      case "outline":
        return `
          background-color: transparent;
          border: 1px solid ${theme.colors.primary};
          color: ${theme.colors.primary};
          &:hover {
            background-color: ${theme.colors.primary};
            color: ${theme.colors.textOnPrimary};
          }
        `;
      case "primary":
      default:
        return `
          background-color: ${theme.colors.primary};
          border: none;
          color: ${theme.colors.textOnPrimary};
          &:hover {
            background-color: ${theme.colors.secondary};
          }
        `;
    }
  }}

  ${({ size }) => {
    switch (size) {
      case "small":
        return `
          padding: 0.25rem 0.5rem;
          font-size: 0.875rem;
        `;
      case "large":
        return `
          padding: 0.75rem 1.5rem;
          font-size: 1.125rem;
        `;
      case "medium":
      default:
        return `
          padding: 0.5rem 1rem;
          font-size: 1rem;
        `;
    }
  }}
`;
