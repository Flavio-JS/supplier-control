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
  color: ${({ theme }) => theme.colors.secondary};
  transition: color 0.3s ease, transform 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: rotate(10deg);
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const ContatoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ContatoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left: 8px;
  gap: 8px;
`;

const EnderecoContainer = styled.div`
  margin-left: 8px;
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
          <ModalContent>
            <p>
              <strong>Nome:</strong> {fornecedor.nome}
            </p>
            <p>
              <strong>Descrição:</strong> {fornecedor.descricao}
            </p>
            <p>
              <strong>Contatos:</strong>
              <ContatoList>
                {fornecedor.contatos.map((contato, index) => {
                  const telefoneFormatado = contato.telefone.replace(/\D/g, "");
                  const whatsappLink = `https://wa.me/${telefoneFormatado}`;

                  return (
                    <ContatoItem key={index}>
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
                    </ContatoItem>
                  );
                })}
              </ContatoList>
            </p>
            <p>
              <strong>Endereço:</strong>
              <EnderecoContainer>
                <strong>CEP:</strong> {fornecedor.endereco.cep}
                <br />
                <strong>Logradouro:</strong> {fornecedor.endereco.logradouro}
                <br />
                <strong>Número:</strong> {fornecedor.endereco.numero}
                <br />
                <strong>Cidade:</strong> {fornecedor.endereco.cidade}
                <br />
                <strong>Estado:</strong> {fornecedor.endereco.estado}
                <br />
                <strong>Referência:</strong>{" "}
                {fornecedor.endereco.referencia || "-"}
              </EnderecoContainer>
            </p>
          </ModalContent>
        )}
        <DialogFooter>
          <Button onClick={onFechar}>Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
