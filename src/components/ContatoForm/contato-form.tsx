import { useFormContext, useFieldArray } from "react-hook-form";
import { Input } from "../ui/Input/input";
import { Button } from "../ui/Button/button";
import styled from "styled-components";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/Form/form";
import { formatTelefone } from "../../utils/formatTelefone";

const ContatoWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export function ContatoForm() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "contatos",
  });

  return (
    <>
      {fields.map((field, index) => (
        <ContatoWrapper key={field.id}>
          <FormField
            control={control}
            name={`contatos.${index}.nome`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Contato*</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do contato" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`contatos.${index}.telefone`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone do Contato*</FormLabel>
                <FormControl>
                  <Input
                    placeholder="(00) 00000-0000"
                    {...field}
                    value={field.value}
                    onChange={(e) => {
                      const formattedTelefone = formatTelefone(e.target.value);
                      field.onChange(formattedTelefone);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <ButtonWrapper>
            <Button type="button" onClick={() => remove(index)}>
              Remover
            </Button>
          </ButtonWrapper>
        </ContatoWrapper>
      ))}
      <Button type="button" onClick={() => append({ nome: "", telefone: "" })}>
        Adicionar Contato
      </Button>
    </>
  );
}
