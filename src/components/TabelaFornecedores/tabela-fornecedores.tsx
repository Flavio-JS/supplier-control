import { Edit, MessageCircle, Trash2, Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/Table/table";
import { Fornecedor } from "../Fornecedores/fornecedor.type";
import { Button } from "../ui/Button/button";
import styled from "styled-components";
import { FormatedDescription } from "../FormatedDescription/formated-description";
import { FormattedAddress } from "../FormattedAddress/formatted-address";

interface TabelaFornecedoresProps {
  fornecedores: Fornecedor[];
  onEditar: (fornecedor: Fornecedor) => void;
  onExcluir: (fornecedor: Fornecedor) => void;
  onVisualizar: (fornecedor: Fornecedor) => void;
}

const ResponsiveTable = styled.div`
  background-color: ${({ theme }) => theme.colors.surface}; // Fundo da tabela
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    th:nth-child(2), // Descrição
    th:nth-child(3), // Contato(s)
    th:nth-child(4), // Endereço
    td:nth-child(2), // Descrição
    td:nth-child(3), // Contato(s)
    td:nth-child(4) {
      // Endereço
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
  color: ${({ theme }) =>
    theme.colors
      .textSecondary};
`;

const NameCell = styled(TableCell)`
  font-weight: 500;
`;

export function TabelaFornecedores({
  fornecedores,
  onEditar,
  onExcluir,
  onVisualizar,
}: TabelaFornecedoresProps) {
  return (
    <ResponsiveTable>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Contato(s)</TableHead>
            <TableHead>Endereço</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!fornecedores || fornecedores.length === 0 ? (
            <TableRow>
              <EmptyCell colSpan={5}>Nenhum fornecedor encontrado</EmptyCell>
            </TableRow>
          ) : (
            fornecedores.map((fornecedor) => (
              <TableRow key={fornecedor.id}>
                <NameCell>{fornecedor.nome}</NameCell>
                <TableCell>
                  <FormatedDescription value={fornecedor.descricao} />
                </TableCell>
                <TableCell>
                  {fornecedor.contatos.map((contato, index) => {
                    const telefoneFormatado = contato.telefone.replace(
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
                          {contato.nome}: {contato.telefone}
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
                <TableCell>
                  <FormattedAddress value={fornecedor.endereco} />
                </TableCell>
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
                      onClick={() => onVisualizar(fornecedor)}
                    >
                      <Eye size={16} />
                    </MobileOnlyButton>

                    <Button
                      variant="ghost"
                      size="small"
                      onClick={() => onEditar(fornecedor)}
                    >
                      <Edit size={16} />
                    </Button>

                    <Button
                      variant="ghost"
                      size="small"
                      onClick={() => onExcluir(fornecedor)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </ActionsCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </ResponsiveTable>
  );
}
