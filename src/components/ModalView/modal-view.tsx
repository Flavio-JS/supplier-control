import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogCloseButton,
} from "../ui/Dialog/dialog";
import { Supplier } from "../Suppliers/supplier.type";
import { MessageCircle, X } from "lucide-react";
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

const ContactList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left: 8px;
  gap: 8px;
`;

const AddressContainer = styled.div`
  margin-left: 8px;
`;

interface ModalViewProps {
  open: boolean;
  onClose: () => void;
  supplier: Supplier | null;
}

export function ModalView({ open, onClose, supplier }: ModalViewProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogCloseButton>
          <X size={20} />
        </DialogCloseButton>
        <DialogHeader>
          <DialogTitle>Detalhes do Fornecedor</DialogTitle>
        </DialogHeader>
        {supplier && (
          <ModalContent>
            <p>
              <strong>Nome:</strong> {supplier.name}
            </p>
            <p>
              <strong>Descrição:</strong> {supplier.description}
            </p>
            <p>
              <strong>Contatos:</strong>
              <ContactList>
                {supplier.contacts.map((contact, index) => {
                  const formattedPhone = contact.telephone.replace(/\D/g, "");
                  const whatsappLink = `https://wa.me/${formattedPhone}`;

                  return (
                    <ContactItem key={index}>
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
                    </ContactItem>
                  );
                })}
              </ContactList>
            </p>
            <p>
              <strong>Endereço:</strong>
              <AddressContainer>
                <strong>CEP:</strong> {supplier.address.zipCode}
                <br />
                <strong>Logradouro:</strong> {supplier.address.street}
                <br />
                <strong>Número:</strong> {supplier.address.number}
                <br />
                <strong>Cidade:</strong> {supplier.address.city}
                <br />
                <strong>Estado:</strong> {supplier.address.state}
                <br />
                <strong>Referência:</strong> {supplier.address.reference || "-"}
              </AddressContainer>
            </p>
          </ModalContent>
        )}
      </DialogContent>
    </Dialog>
  );
}
