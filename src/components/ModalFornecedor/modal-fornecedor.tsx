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
import { formatTelefone } from "../../utils/formatTelefone";
import { useFieldArray } from "react-hook-form";
import axios from "axios";
import { formatCep } from "../../utils/formatCep";
import styled from "styled-components";

const ContatoWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-end;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

// Esquema de validação com Yup
const formSchema = yup.object({
  id: yup.string().optional(),
  nome: yup
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .required("Nome é obrigatório")
    .max(75, "Nome deve ter no máximo 75 caracteres"),
  descricao: yup
    .string()
    .matches(/^[a-zA-Z0-9 ]*$/, "Descrição deve ser alfanumérica")
    .max(100, "Descrição deve ter no máximo 100 caracteres"),
  contatos: yup
    .array()
    .of(
      yup.object().shape({
        nome: yup
          .string()
          .required("Nome do contato é obrigatório")
          .matches(/^[a-zA-Z ]*$/, "Nome deve ser alfabético"),
        telefone: yup
          .string()
          .required("Telefone é obrigatório")
          .matches(/^\(\d{2}\) \d{5}-\d{4}$/, "Formato inválido"),
      })
    )
    .min(1, "Pelo menos um contato é obrigatório"),
  endereco: yup.object().shape({
    cep: yup
      .string()
      .required("CEP é obrigatório")
      .matches(/^\d{5}-\d{3}$/, "Formato inválido"),
    estado: yup
      .string()
      .required("Estado é obrigatório")
      .matches(/^[A-Z]{2}$/, "Estado deve ter 2 letras maiúsculas"),
    cidade: yup
      .string()
      .required("Cidade é obrigatória")
      .matches(/^[a-zA-Z ]*$/, "Cidade deve ser alfabética"),
    logradouro: yup
      .string()
      .required("Logradouro é obrigatório")
      .matches(/^[a-zA-Z0-9 ]*$/, "Logradouro deve ser alfanumérico"),
    numero: yup
      .string()
      .required("Número é obrigatório")
      .matches(/^\d+$/, "Número deve ser numérico"),
    referencia: yup
      .string()
      .matches(/^[a-zA-Z0-9 ]*$/, "Referência deve ser alfanumérica"),
  }),
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
      id: "",
      nome: "",
      descricao: "",
      contatos: [{ nome: "", telefone: "" }],
      endereco: {
        cep: "",
        estado: "",
        cidade: "",
        logradouro: "",
        numero: "",
        referencia: "",
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "contatos",
  });

  // Preencher o formulário quando um fornecedor for passado para edição
  useEffect(() => {
    if (fornecedor) {
      form.reset(fornecedor); // Preenche o formulário com os dados do fornecedor existente
    } else {
      form.reset({
        id: "", // Deixe o id vazio para novos fornecedores
        nome: "",
        descricao: "",
        contatos: [{ nome: "", telefone: "" }],
        endereco: {
          cep: "",
          estado: "",
          cidade: "",
          logradouro: "",
          numero: "",
          referencia: "",
        },
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
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              overflowY: "scroll",
              height: "80vh",
            }}
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
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
            {fields.map((field, index) => (
              <ContatoWrapper key={field.id}>
                <FormField
                  control={form.control}
                  name={`contatos.${index}.nome`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Contato</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do contato" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`contatos.${index}.telefone`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone do Contato*</FormLabel>
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
                <Button
                  style={{ height: 40 }}
                  type="button"
                  onClick={() => remove(index)}
                >
                  Remover
                </Button>
              </ContatoWrapper>
            ))}
            <Button
              type="button"
              onClick={() => append({ nome: "", telefone: "" })}
            >
              Adicionar Contato
            </Button>
            <FormField
              control={form.control}
              name="endereco.cep"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CEP*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="00000-000"
                      value={field.value}
                      onChange={(e) =>
                        field.onChange(formatCep(e.target.value))
                      }
                      onBlur={async (e) => {
                        const cep = e.target.value.replace(/\D/g, "");
                        if (cep.length === 8) {
                          const response = await axios.get(
                            `https://viacep.com.br/ws/${cep}/json/`
                          );
                          form.setValue("endereco.estado", response.data.uf);
                          form.setValue(
                            "endereco.cidade",
                            response.data.localidade
                          );
                          form.setValue(
                            "endereco.logradouro",
                            response.data.logradouro
                          );
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
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
              control={form.control}
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
              control={form.control}
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
              control={form.control}
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
              control={form.control}
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
            <FormField
              control={form.control}
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
