import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const TableHeader = styled.thead`
  background-color: #f7fafc;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f7fafc;
  }
  &:hover {
    background-color: #ebf8ff;
  }
`;

export const TableHead = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #4a5568;
  border-bottom: 1px solid #e2e8f0;
`;

export const TableBody = styled.tbody``;

export const TableCell = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  color: #4a5568;
`;
