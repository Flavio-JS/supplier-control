import { useFormContext } from "react-hook-form";
import { Input } from "../ui/Input/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/Form/form";
import { ContactForm } from "../ContactForm/contact-form";
import { AddressForm } from "../AddressForm/address-form";
import styled from "styled-components";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export function SupplierForm() {
  const { control } = useFormContext();

  return (
    <FormContainer>
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome*</FormLabel>
            <FormControl>
              <Input placeholder="Nome do fornecedor" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Descrição</FormLabel>
            <FormControl>
              <Input placeholder="Descrição do fornecedor" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <ContactForm />
      <AddressForm />
    </FormContainer>
  );
}
