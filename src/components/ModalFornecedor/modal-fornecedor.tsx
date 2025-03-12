import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/Dialog/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/Form/form";
import { Input } from "../ui/Input/input";
import { Button } from "../ui/Button/button";
import { Fornecedor } from "../Fornecedores/fornecedor.type";
import { formatCNPJ } from "../../utils/formatCNPJ";
import { formatTelefone } from "../../utils/formatTelefone";

// Esquema de validação com Yup
const formSchema = yup.object({
  id: yup.number().optional(),
  nome: yup
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .required("Nome é obrigatório")
    .max(75, "Nome deve ter no máximo 75 caracteres"),
  cnpj: yup.string().min(14, "CNPJ inválido").required("CNPJ é obrigatório"),
  email: yup
    .string()
    .email("Email inválido")
    .required("Email é obrigatório")
    .max(50, "Email deve ter no máximo 50 caracteres"),
  telefone: yup
    .string()
    .min(8, "Telefone inválido")
    .required("Telefone é obrigatório"),
  endereco: yup
    .string()
    .min(5, "Endereço deve ter pelo menos 5 caracteres")
    .required("Endereço é obrigatório")
    .max(100, "Endereço deve ter no máximo 100 caracteres"),
});

interface ModalFornecedorProps {
  aberto: boolean;
  onFechar: () => void;
  onSalvar: (fornecedor: Fornecedor) => void;
  fornecedor: Fornecedor | null;
}

export function ModalFornecedor({
  aberto,
  onFechar,
  onSalvar,
  fornecedor,
}: ModalFornecedorProps) {
  const form = useForm<yup.InferType<typeof formSchema>>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      id: 0,
      nome: "",
      cnpj: "",
      email: "",
      telefone: "",
      endereco: "",
    },
  });

  // Preencher o formulário quando um fornecedor for passado para edição
  useEffect(() => {
    if (fornecedor) {
      form.reset(fornecedor);
    } else {
      form.reset({
        id: 0,
        nome: "",
        cnpj: "",
        email: "",
        telefone: "",
        endereco: "",
      });
    }
  }, [fornecedor, form]);

  function onSubmit(values: yup.InferType<typeof formSchema>) {
    onSalvar(values as Fornecedor);
  }

  return (
    <Dialog open={aberto} onOpenChange={onFechar}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {fornecedor ? "Editar Fornecedor" : "Novo Fornecedor"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do fornecedor" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cnpj"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CNPJ</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="00.000.000/0000-00"
                      value={field.value}
                      onChange={(e) =>
                        field.onChange(formatCNPJ(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="email@exemplo.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="telefone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="(00) 00000-0000"
                      value={field.value}
                      onChange={(e) =>
                        field.onChange(formatTelefone(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endereco"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                    <Input placeholder="Endereço completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={onFechar}>
                Cancelar
              </Button>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
