import { useState } from "react";
import { Edit, MessageCircle, Trash2, Eye, EyeOff } from "lucide-react";
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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover/popover";

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
`;

const EmptyCell = styled(TableCell)`
  text-align: center;
  padding: 1.5rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const NameCell = styled(TableCell)`
  font-weight: 500;
`;

export function SuppliersTable({
  suppliers,
  onEdit,
  onDelete,
  onView,
}: SuppliersTableProps) {
  const [visibleColumns, setVisibleColumns] = useState({
    name: true,
    description: true,
    contacts: true,
    address: true,
    actions: true,
  });

  const toggleColumnVisibility = (column: keyof typeof visibleColumns) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  return (
    <ResponsiveTable>
      <Popover>
        <PopoverTrigger
          style={{ margin: "1rem" }}
          variant="outline"
          size="medium"
        >
          Colunas
        </PopoverTrigger>
        <PopoverContent
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <div
            style={{
              marginBottom: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <Button
              variant="ghost"
              onClick={() => toggleColumnVisibility("name")}
            >
              {visibleColumns.name ? (
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <EyeOff /> <span>Ocultar Nome</span>
                </div>
              ) : (
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <Eye /> <span>Mostrar Nome</span>
                </div>
              )}
            </Button>
            <Button
              variant="ghost"
              onClick={() => toggleColumnVisibility("description")}
            >
              {visibleColumns.description ? (
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <EyeOff /> <span>Ocultar Descrição</span>
                </div>
              ) : (
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <Eye /> <span>Mostrar Descrição</span>
                </div>
              )}
            </Button>
            <Button
              variant="ghost"
              onClick={() => toggleColumnVisibility("contacts")}
            >
              {visibleColumns.contacts ? (
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <EyeOff /> <span>Ocultar Contatos</span>
                </div>
              ) : (
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <Eye /> <span>Mostrar Contatos</span>
                </div>
              )}
            </Button>
            <Button
              variant="ghost"
              onClick={() => toggleColumnVisibility("address")}
            >
              {visibleColumns.address ? (
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <EyeOff /> <span>Ocultar Endereço</span>
                </div>
              ) : (
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <Eye /> <span>Mostrar Endereço</span>
                </div>
              )}
            </Button>
            <Button
              variant="ghost"
              onClick={() => toggleColumnVisibility("actions")}
            >
              {visibleColumns.actions ? (
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <EyeOff /> <span>Ocultar Ações</span>
                </div>
              ) : (
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <Eye />
                  <span>Mostrar Ações</span>
                </div>
              )}
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      <Table>
        <TableHeader>
          <TableRow>
            {visibleColumns.name && <TableHead>Nome</TableHead>}
            {visibleColumns.description && <TableHead>Descrição</TableHead>}
            {visibleColumns.contacts && <TableHead>Contato(s)</TableHead>}
            {visibleColumns.address && <TableHead>Endereço</TableHead>}
            {visibleColumns.actions && <TableHead>Ações</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {!suppliers || suppliers.length === 0 ? (
            <TableRow>
              <EmptyCell colSpan={5}>Nenhum fornecedor encontrado</EmptyCell>
            </TableRow>
          ) : (
            suppliers.map((supplier) => (
              <TableRow key={supplier.id}>
                {visibleColumns.name && <NameCell>{supplier.name}</NameCell>}
                {visibleColumns.description && (
                  <TableCell>
                    <FormatedDescription value={supplier.description} />
                  </TableCell>
                )}
                {visibleColumns.contacts && (
                  <TableCell>
                    {supplier.contacts.map((contact, index) => {
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
                            <MessageCircle fill="currentColor" size={20} />
                          </IconWrapper>
                        </div>
                      );
                    })}
                  </TableCell>
                )}
                {visibleColumns.address && (
                  <TableCell>
                    <FormattedAddress value={supplier.address} />
                  </TableCell>
                )}
                {visibleColumns.actions && (
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
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </ResponsiveTable>
  );
}
