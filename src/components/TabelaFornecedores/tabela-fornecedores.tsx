import { Edit, Trash2 } from "lucide-react";
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
import { FormattedAddress } from "../ui/FormattedAddress/formatted-address";
import { FormatedDescription } from "../ui/FormatedDescription/formated-description";
import styled from "styled-components";

interface TabelaFornecedoresProps {
  fornecedores: Fornecedor[];
  onEditar: (fornecedor: Fornecedor) => void;
  onExcluir: (fornecedor: Fornecedor) => void;
}

const ResponsiveTable = styled.div`
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

export function TabelaFornecedores({
  fornecedores,
  onEditar,
  onExcluir,
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
            <TableHead style={{ textAlign: "right" }}>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!fornecedores || fornecedores.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5} // Ajuste para o número de colunas visíveis
                style={{
                  textAlign: "center",
                  padding: "1.5rem",
                  color: "#a0aec0",
                }}
              >
                Nenhum fornecedor encontrado
              </TableCell>
            </TableRow>
          ) : (
            fornecedores.map((fornecedor) => (
              <TableRow key={fornecedor.id}>
                <TableCell style={{ fontWeight: "500" }}>
                  {fornecedor.nome}
                </TableCell>
                <TableCell>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <FormatedDescription value={fornecedor.descricao} />
                  </div>
                </TableCell>
                <TableCell>
                  {fornecedor.contatos.map((contato, index) => (
                    <div key={index}>
                      {contato.nome}: {contato.telefone}
                    </div>
                  ))}
                </TableCell>
                <TableCell>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <FormattedAddress value={fornecedor.endereco} />
                  </div>
                </TableCell>
                <TableCell style={{ textAlign: "right" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: "0.5rem",
                    }}
                  >
                    <Button
                      variant="ghost"
                      size="small"
                      onClick={() => onEditar(fornecedor)}
                    >
                      <Edit style={{ height: "1rem", width: "1rem" }} />
                      <span
                        style={{ visibility: "hidden", position: "absolute" }}
                      >
                        Editar
                      </span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="small"
                      onClick={() => onExcluir(fornecedor)}
                    >
                      <Trash2 style={{ height: "1rem", width: "1rem" }} />
                      <span
                        style={{ visibility: "hidden", position: "absolute" }}
                      >
                        Excluir
                      </span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </ResponsiveTable>
  );
}
