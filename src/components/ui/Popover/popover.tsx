import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import styled from "styled-components";

const Popover = PopoverPrimitive.Root;

// Substitua o PopoverTrigger original pelo StyledPopoverTrigger
const PopoverTrigger = styled(PopoverPrimitive.Trigger)<{
  variant?: "primary" | "ghost" | "outline";
  size?: "small" | "medium" | "large";
}>`
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

const StyledPopoverContent = styled(PopoverPrimitive.Content)`
  z-index: 50;
  width: 18rem;
  border-radius: 0.375rem;
  border: 1px solid ${({ theme }) => theme.colors.surface};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  outline: none;

  &[data-state="open"] {
    animation: fadeIn 0.2s ease-in-out;
  }

  &[data-state="closed"] {
    animation: fadeOut 0.2s ease-in-out;
  }

  &[data-side="bottom"] {
    animation: slideInFromTop 0.2s ease-in-out;
  }

  &[data-side="left"] {
    animation: slideInFromRight 0.2s ease-in-out;
  }

  &[data-side="right"] {
    animation: slideInFromLeft 0.2s ease-in-out;
  }

  &[data-side="top"] {
    animation: slideInFromBottom 0.2s ease-in-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.95);
    }
  }

  @keyframes slideInFromTop {
    from {
      transform: translateY(-8px);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes slideInFromRight {
    from {
      transform: translateX(8px);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes slideInFromLeft {
    from {
      transform: translateX(-8px);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes slideInFromBottom {
    from {
      transform: translateY(8px);
    }
    to {
      transform: translateY(0);
    }
  }
`;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & {
    align?: "start" | "center" | "end";
    sideOffset?: number;
  }
>(({ align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <StyledPopoverContent
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      {...props}
    />
  </PopoverPrimitive.Portal>
));

PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };
