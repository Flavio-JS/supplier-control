import { useState } from "react";
import { Edit, MessageCircle, Trash2, Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/Table/table";
import { Supplier } from "../Suppliers/supplier.type";
import { Button } from "../ui/Button/button";
import styled from "styled-components";
import { FormatedDescription } from "../FormatedDescription/formated-description";
import { FormattedAddress } from "../FormattedAddress/formatted-address";
import {
  Column,
  ColumnControlPopover,
} from "../ColumnControlPopover/column-control-popover";

interface SuppliersTableProps {
  suppliers: Supplier[];
  onEdit: (supplier: Supplier) => void;
  onDelete: (supplier: Supplier) => void;
  onView: (supplier: Supplier) => void;
}

const ResponsiveTable = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    th:nth-child(2),
    th:nth-child(3),
    th:nth-child(4),
    td:nth-child(2),
    td:nth-child(3),
    td:nth-child(4) {
      display: none;
    }
  }
`;

const IconWrapper = styled.a`
  color: ${({ theme }) => theme.colors.secondary};
  transition: color 0.3s ease, transform 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: rotate(10deg);
  }
`;

const MobileOnlyButton = styled(Button)`
  @media (min-width: 769px) {
    display: none;
  }
`;

const ActionsCell = styled(TableCell)`
  text-align: right;
  border: none;
`;

const EmptyCell = styled(TableCell)`
  text-align: center;
  padding: 1.5rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const PopoverWrapper = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

export function SuppliersTable({
  suppliers,
  onEdit,
  onDelete,
  onView,
}: SuppliersTableProps) {
  const [visibleColumns, setVisibleColumns] = useState<Column[]>([
    { id: "name", label: "Nome", visible: true },
    { id: "description", label: "Descrição", visible: true },
    { id: "contacts", label: "Contato(s)", visible: true },
    { id: "address", label: "Endereço", visible: true },
    { id: "actions", label: "Ações", visible: true },
  ]);

  const handleToggleColumn = (columnId: string) => {
    setVisibleColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.id === columnId
          ? { ...column, visible: !column.visible }
          : column
      )
    );
  };

  return (
    <ResponsiveTable>
      <PopoverWrapper>
        <ColumnControlPopover
          columns={visibleColumns}
          onToggleColumn={handleToggleColumn}
        />
      </PopoverWrapper>

      <Table>
        <TableHeader>
          <TableRow>
            {visibleColumns.map(
              (column) =>
                column.visible && (
                  <TableHead key={column.id}>{column.label}</TableHead>
                )
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {!suppliers || suppliers.length === 0 ? (
            <TableRow>
              <EmptyCell colSpan={visibleColumns.length + 1}>
                Nenhum fornecedor encontrado
              </EmptyCell>
            </TableRow>
          ) : (
            suppliers.map((supplier) => (
              <TableRow key={supplier.id}>
                {visibleColumns.map(
                  (column) =>
                    column.visible && (
                      <TableCell key={column.id}>
                        {column.id === "name" && supplier.name}
                        {column.id === "description" && (
                          <FormatedDescription value={supplier.description} />
                        )}
                        {column.id === "contacts" &&
                          supplier.contacts.map((contact, index) => {
                            const telefoneFormatado = contact.telephone.replace(
                              /\D/g,
                              ""
                            );
                            const whatsappLink = `https://wa.me/${telefoneFormatado}`;

                            return (
                              <div
                                key={index}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  gap: "8px",
                                }}
                              >
                                <span>
                                  {contact.name}: {contact.telephone}
                                </span>
                                <IconWrapper
                                  href={whatsappLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{ textDecoration: "none" }}
                                >
                                  <MessageCircle
                                    fill="currentColor"
                                    size={20}
                                  />
                                </IconWrapper>
                              </div>
                            );
                          })}
                        {column.id === "address" && (
                          <FormattedAddress value={supplier.address} />
                        )}
                        {column.id === "actions" && (
                          <ActionsCell>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                gap: "0.5rem",
                              }}
                            >
                              <MobileOnlyButton
                                variant="ghost"
                                size="small"
                                onClick={() => onView(supplier)}
                              >
                                <Eye size={16} />
                              </MobileOnlyButton>

                              <Button
                                variant="ghost"
                                size="small"
                                onClick={() => onEdit(supplier)}
                              >
                                <Edit size={16} />
                              </Button>

                              <Button
                                variant="ghost"
                                size="small"
                                onClick={() => onDelete(supplier)}
                              >
                                <Trash2 size={16} />
                              </Button>
                            </div>
                          </ActionsCell>
                        )}
                      </TableCell>
                    )
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </ResponsiveTable>
  );
}
