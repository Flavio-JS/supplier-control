import { useFormContext } from "react-hook-form";
import { Input } from "../ui/Input/input";
import axios from "axios";
import { formatZipCode } from "../../utils/formatZipCode";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/Form/form";

export function AddressForm() {
  const { control, setValue } = useFormContext();

  return (
    <>
      <FormField
        control={control}
        name="address.zipCode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>CEP*</FormLabel>
            <FormControl>
              <Input
                placeholder="00000-000"
                value={field.value}
                onChange={(e) => {
                  const formattedZipCode = formatZipCode(e.target.value);
                  field.onChange(formattedZipCode);
                  if (formattedZipCode.length === 9) {
                    const zipCode = formattedZipCode.replace(/\D/g, "");
                    axios
                      .get(`https://viacep.com.br/ws/${zipCode}/json/`)
                      .then((response) => {
                        setValue("address.state", response.data.uf);
                        setValue("address.city", response.data.localidade);
                        setValue("address.street", response.data.logradouro);
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
        name="address.state"
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
        name="address.city"
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
        name="address.street"
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
        name="address.number"
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
        name="address.reference"
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
