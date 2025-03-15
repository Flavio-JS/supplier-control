import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import styled from "styled-components";

const TooltipContentStyled = styled(TooltipPrimitive.Content)`
  z-index: 50;
  overflow: hidden;
  border-radius: 0.375rem;
  border: 1px solid ${({ theme }) => theme.colors.textSecondary};
  background-color: ${({ theme }) => theme.colors.background};
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  animation-duration: 200ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);

  &[data-state="open"] {
    animation-name: fadeIn, zoomIn;
  }

  &[data-state="closed"] {
    animation-name: fadeOut, zoomOut;
  }

  &[data-side="bottom"] {
    animation-name: slideInFromTop;
  }

  &[data-side="left"] {
    animation-name: slideInFromRight;
  }

  &[data-side="right"] {
    animation-name: slideInFromLeft;
  }

  &[data-side="top"] {
    animation-name: slideInFromBottom;
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

  @keyframes zoomIn {
    from {
      transform: scale(0.95);
    }
    to {
      transform: scale(1);
    }
  }

  @keyframes zoomOut {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(0.95);
    }
  }

  @keyframes slideInFromTop {
    from {
      transform: translateY(-2px);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes slideInFromRight {
    from {
      transform: translateX(2px);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes slideInFromLeft {
    from {
      transform: translateX(-2px);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes slideInFromBottom {
    from {
      transform: translateY(2px);
    }
    to {
      transform: translateY(0);
    }
  }
`;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ sideOffset = 4, ...props }, ref) => (
  <TooltipContentStyled ref={ref} sideOffset={sideOffset} {...props} />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipProvider = TooltipPrimitive.Provider;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
