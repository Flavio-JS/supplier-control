import { useFormContext } from "react-hook-form";
import { Input } from "../ui/Input/input";
import axios from "axios";
import { formatCep } from "../../utils/formatCep";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/Form/form";

export function EnderecoForm() {
  const { control, setValue } = useFormContext();

  return (
    <>
      <FormField
        control={control}
        name="endereco.cep"
        render={({ field }) => (
          <FormItem>
            <FormLabel>CEP*</FormLabel>
            <FormControl>
              <Input
                placeholder="00000-000"
                value={field.value}
                onChange={(e) => {
                  const formattedCep = formatCep(e.target.value);
                  field.onChange(formattedCep);
                  if (formattedCep.length === 9) {
                    const cep = formattedCep.replace(/\D/g, "");
                    axios
                      .get(`https://viacep.com.br/ws/${cep}/json/`)
                      .then((response) => {
                        setValue("endereco.estado", response.data.uf);
                        setValue("endereco.cidade", response.data.localidade);
                        setValue(
                          "endereco.logradouro",
                          response.data.logradouro
                        );
                      });
                  }
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="endereco.estado"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Estado*</FormLabel>
            <FormControl>
              <Input placeholder="Estado" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="endereco.cidade"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Cidade*</FormLabel>
            <FormControl>
              <Input placeholder="Cidade" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="endereco.logradouro"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Logradouro*</FormLabel>
            <FormControl>
              <Input placeholder="Logradouro" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="endereco.numero"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Número*</FormLabel>
            <FormControl>
              <Input placeholder="Número" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="endereco.referencia"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Referência</FormLabel>
            <FormControl>
              <Input placeholder="Referência" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
