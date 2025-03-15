import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/Dialog/dialog";
import { Button } from "../ui/Button/button";
import { Fornecedor } from "../Fornecedores/fornecedor.type";
import { FornecedorForm } from "../FornecedorForm/fornecedor-form";

const formSchema = yup.object({
  id: yup.string().optional(),
  nome: yup
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .matches(/^[a-zA-Z0-9 ]*$/, "Nome deve ser alfanumérica")
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

  useEffect(() => {
    if (fornecedor) {
      form.reset(fornecedor);
    } else {
      form.reset({
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
      });
    }
  }, [fornecedor, form]);

  const onSubmit = (values: yup.InferType<typeof formSchema>) => {
    onSalvar(values as Fornecedor);
  };

  return (
    <Dialog open={aberto} onOpenChange={onFechar}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {fornecedor ? "Editar Fornecedor" : "Novo Fornecedor"}
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...form}>
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
            <FornecedorForm />
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={onFechar}>
                Cancelar
              </Button>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
