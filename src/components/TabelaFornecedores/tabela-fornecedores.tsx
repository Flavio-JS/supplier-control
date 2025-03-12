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

interface TabelaFornecedoresProps {
  fornecedores: Fornecedor[];
  onEditar: (fornecedor: Fornecedor) => void;
  onExcluir: (fornecedor: Fornecedor) => void;
}

export function TabelaFornecedores({
  fornecedores,
  onEditar,
  onExcluir,
}: TabelaFornecedoresProps) {
  return (
    <div style={{ border: "1px solid #e2e8f0", borderRadius: "8px" }}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>CNPJ</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Endereço</TableHead>
            <TableHead style={{ textAlign: "right" }}>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fornecedores.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
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
                <TableCell>{fornecedor.cnpj}</TableCell>
                <TableCell>{fornecedor.email}</TableCell>
                <TableCell>{fornecedor.telefone}</TableCell>
                <TableCell>{fornecedor.endereco}</TableCell>
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
    </div>
  );
}
