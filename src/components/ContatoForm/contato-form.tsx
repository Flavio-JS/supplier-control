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
import { Trash2 } from "lucide-react";

const ContatoWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
  }
`;

const InputContainer = styled.div`
  flex: 1;
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 28px;

  @media (max-width: 768px) {
    margin-top: 0;
    justify-content: flex-start;
  }
`;

const ContatoFormItem = styled(FormItem)`
  width: 100%;
`;

export function ContatoForm() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "contatos",
  });

  if (fields.length === 0) {
    append({ nome: "", telefone: "" });
  }

  return (
    <>
      {fields.map((field, index) => (
        <ContatoWrapper key={field.id}>
          <InputContainer>
            <FormField
              control={control}
              name={`contatos.${index}.nome`}
              render={({ field }) => (
                <ContatoFormItem>
                  <FormLabel>Nome do Contato*</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do contato" {...field} />
                  </FormControl>
                  <FormMessage />
                </ContatoFormItem>
              )}
            />
            <FormField
              control={control}
              name={`contatos.${index}.telefone`}
              render={({ field }) => (
                <ContatoFormItem>
                  <FormLabel>Telefone do Contato*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="(00) 00000-0000"
                      {...field}
                      value={field.value}
                      onChange={(e) => {
                        const formattedTelefone = formatTelefone(
                          e.target.value
                        );
                        field.onChange(formattedTelefone);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </ContatoFormItem>
              )}
            />
          </InputContainer>
          <ButtonWrapper>
            {fields.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                onClick={() => remove(index)}
              >
                <Trash2 />
              </Button>
            )}
          </ButtonWrapper>
        </ContatoWrapper>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={() => append({ nome: "", telefone: "" })}
      >
        Adicionar Contato
      </Button>
    </>
  );
}
