import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import styled from "styled-components";

const StyledCheckbox = styled(CheckboxPrimitive.Root)`
  all: unset;
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }

  &[data-state="checked"] {
    background-color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.textOnPrimary};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const StyledIndicator = styled(CheckboxPrimitive.Indicator)`
  color: ${({ theme }) => theme.colors.textOnPrimary};
  display: flex;
  align-items: center;
  justify-content: center;
`;

type CheckboxProps = React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
>;

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ ...props }, ref) => {
  return (
    <StyledCheckbox ref={ref} {...props}>
      <StyledIndicator>
        <Check size={14} />
      </StyledIndicator>
    </StyledCheckbox>
  );
});

Checkbox.displayName = "Checkbox";

export { Checkbox };
