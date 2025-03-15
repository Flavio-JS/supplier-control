import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/Dialog/dialog";
import { Button } from "../ui/Button/button";
import { Fornecedor } from "../Fornecedores/fornecedor.type";
import { MessageCircle } from "lucide-react";
import styled from "styled-components";

const IconWrapper = styled.a`
  color: #25d366;
  transition: color 1s ease, transform 0.5s ease;

  &:hover {
    color: #128c7e;
    transform: rotate(10deg);
  }
`;

interface ModalVisualizacaoProps {
  aberto: boolean;
  onFechar: () => void;
  fornecedor: Fornecedor | null;
}

export function ModalVisualizacao({
  aberto,
  onFechar,
  fornecedor,
}: ModalVisualizacaoProps) {
  return (
    <Dialog open={aberto} onOpenChange={onFechar}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalhes do Fornecedor</DialogTitle>
        </DialogHeader>
        {fornecedor && (
          <div>
            <p>
              <strong>Nome:</strong> {fornecedor.nome}
            </p>
            <p>
              <strong>Descrição:</strong> {fornecedor.descricao}
            </p>
            <p>
              <strong>Contatos:</strong>
              <ul>
                {fornecedor.contatos.map((contato, index) => {
                  const telefoneFormatado = contato.telefone.replace(/\D/g, "");
                  const whatsappLink = `https://wa.me/${telefoneFormatado}`;

                  return (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        marginLeft: "8px",
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
                        <MessageCircle size={20} />
                      </IconWrapper>
                    </div>
                  );
                })}
              </ul>
            </p>
            <p>
              <strong>Endereço:</strong>{" "}
              <div>
                <strong style={{ marginLeft: 8 }}>CEP:</strong>{" "}
                {fornecedor.endereco.cep}
                <br />
                <strong style={{ marginLeft: 8 }}>Logradouro:</strong>{" "}
                {fornecedor.endereco.logradouro}
                <br />
                <strong style={{ marginLeft: 8 }}>Número:</strong>{" "}
                {fornecedor.endereco.numero}
                <br />
                <strong style={{ marginLeft: 8 }}>Cidade:</strong>{" "}
                {fornecedor.endereco.cidade}
                <br />
                <strong style={{ marginLeft: 8 }}>Estado:</strong>{" "}
                {fornecedor.endereco.estado}
                <br />
                <strong style={{ marginLeft: 8 }}>Referência:</strong>{" "}
                {fornecedor.endereco.referencia || "-"}
              </div>
            </p>
          </div>
        )}
        <DialogFooter>
          <Button onClick={onFechar}>Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
