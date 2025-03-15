import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const TableHeader = styled.thead`
  background-color: ${({ theme }) =>
    theme.colors.background};
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${({ theme }) =>
      theme.colors.background};
  }
  &:hover {
    background-color: ${({ theme }) =>
      theme.colors.surface};
  }
`;

export const TableHead = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: ${({ theme }) =>
    theme.colors.textPrimary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.textSecondary};
`;

export const TableBody = styled.tbody``;

export const TableCell = styled.td`
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.textSecondary};
  color: ${({ theme }) => theme.colors.textPrimary};
`;
