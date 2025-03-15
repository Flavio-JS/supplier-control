import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import styled from "styled-components";
import { ButtonProps } from "../Button/button";

const PaginationContainer = styled.nav`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
`;

const PaginationContent = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25rem;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const PaginationItem = styled.li``;

const PaginationLink = styled.a<{ isActive?: boolean; disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.2s;
  color: ${({ theme }) => theme.colors.textPrimary};

  ${({ isActive, theme }) =>
    isActive
      ? `
    border: 1px solid ${theme.colors.textSecondary};
    background-color: ${theme.colors.surface};
  `
      : `
    background-color: transparent;
    &:hover {
      background-color: ${theme.colors.surface};
    }
  `}

  ${({ disabled }) =>
    disabled
      ? `
    cursor: not-allowed;
    opacity: 0.5;
  `
      : ""}
`;

const PaginationPreviousNext = styled(PaginationLink)`
  gap: 0.5rem;
  padding-left: 0.625rem;
  padding-right: 0.625rem;
`;

const PaginationEllipsis = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <PaginationContainer
    role="navigation"
    aria-label="pagination"
    className={className}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContentComponent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <PaginationContent ref={ref} className={className} {...props} />
));
PaginationContentComponent.displayName = "PaginationContent";

const PaginationItemComponent = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <PaginationItem ref={ref} className={className} {...props} />
));
PaginationItemComponent.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
  disabled?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">;

const PaginationLinkComponent = ({
  className,
  isActive,
  disabled,
  ...props
}: PaginationLinkProps) => (
  <PaginationLink
    aria-current={isActive ? "page" : undefined}
    isActive={isActive}
    disabled={disabled}
    className={className}
    {...props}
  />
);
PaginationLinkComponent.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLinkComponent>) => (
  <PaginationPreviousNext
    aria-label="Go to previous page"
    className={className}
    {...props}
  >
    <ChevronLeft size={16} />
  </PaginationPreviousNext>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLinkComponent>) => (
  <PaginationPreviousNext
    aria-label="Go to next page"
    className={className}
    {...props}
  >
    <ChevronRight size={16} />
  </PaginationPreviousNext>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsisComponent = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <PaginationEllipsis className={className} {...props}>
    <MoreHorizontal size={16} />
  </PaginationEllipsis>
);
PaginationEllipsisComponent.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContentComponent as PaginationContent,
  PaginationEllipsisComponent as PaginationEllipsis,
  PaginationItemComponent as PaginationItem,
  PaginationLinkComponent as PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
