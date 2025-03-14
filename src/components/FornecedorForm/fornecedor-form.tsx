import { useFormContext } from "react-hook-form";
import { Input } from "../ui/Input/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/Form/form";
import { ContatoForm } from "../ContatoForm/contato-form";
import { EnderecoForm } from "../EnderecoForm/endereco-form";

export function FornecedorForm() {
  const { control } = useFormContext();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <FormField
        control={control}
        name="nome"
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
        name="descricao"
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
      <ContatoForm />
      <EnderecoForm />
    </div>
  );
}
