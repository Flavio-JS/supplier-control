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
  DialogCloseButton,
} from "../ui/Dialog/dialog";
import { Button } from "../ui/Button/button";
import styled from "styled-components";
import { X } from "lucide-react";
import { Supplier } from "../Suppliers/supplier.type";
import { SupplierForm } from "../SupplierForm/supplier-form";

const formSchema = yup.object({
  id: yup.string().optional(),
  name: yup
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .matches(/^[a-zA-Z0-9 ]*$/, "Nome deve ser alfanumérica")
    .required("Nome é obrigatório")
    .max(75, "Nome deve ter no máximo 75 caracteres"),
  description: yup
    .string()
    .matches(/^[a-zA-Z0-9 ]*$/, "Descrição deve ser alfanumérica")
    .max(100, "Descrição deve ter no máximo 100 caracteres"),
  contacts: yup
    .array()
    .of(
      yup.object().shape({
        name: yup
          .string()
          .required("Nome é obrigatório")
          .matches(/^[a-zA-Z ]*$/, "Nome deve ser alfabético"),
        telephone: yup
          .string()
          .required("Telefone é obrigatório")
          .matches(/^\(\d{2}\) \d{5}-\d{4}$/, "Formato inválido"),
      })
    )
    .min(1, "Pelo menos um contato é obrigatório"),
  address: yup.object().shape({
    zipCode: yup
      .string()
      .required("CEP é obrigatório")
      .matches(/^\d{5}-\d{3}$/, "Formato inválido"),
    state: yup
      .string()
      .required("Estado é obrigatório")
      .matches(/^[A-Z]{2}$/, "Estado deve ter 2 letras maiúsculas"),
    city: yup
      .string()
      .required("Cidade é obrigatória")
      .matches(/^[a-zA-Z ]*$/, "Cidade deve ser alfabética"),
    street: yup
      .string()
      .required("Logradouro é obrigatório")
      .matches(/^[a-zA-Z0-9 ]*$/, "Logradouro deve ser alfanumérico"),
    number: yup
      .string()
      .required("Número é obrigatório")
      .matches(/^\d+$/, "Número deve ser numérico"),
    reference: yup
      .string()
      .matches(/^[a-zA-Z0-9 ]*$/, "Referência deve ser alfanumérica"),
  }),
});

interface SupplierModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (supplier: Supplier) => void;
  supplier: Supplier | null;
}

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
  max-height: 80vh;
  padding-right: 0.5rem;
`;

export function SupplierModal({
  isOpen,
  onClose,
  onSave,
  supplier,
}: SupplierModalProps) {
  const form = useForm<yup.InferType<typeof formSchema>>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      id: "",
      name: "",
      description: "",
      contacts: [{ name: "", telephone: "" }],
      address: {
        zipCode: "",
        state: "",
        city: "",
        street: "",
        number: "",
        reference: "",
      },
    },
  });

  useEffect(() => {
    if (supplier) {
      form.reset(supplier);
    } else {
      form.reset({
        id: "",
        name: "",
        description: "",
        contacts: [{ name: "", telephone: "" }],
        address: {
          zipCode: "",
          state: "",
          city: "",
          street: "",
          number: "",
          reference: "",
        },
      });
    }
  }, [supplier, form]);

  const onSubmit = (values: yup.InferType<typeof formSchema>) => {
    onSave(values as Supplier);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogCloseButton>
          <X size={20} />
        </DialogCloseButton>
        <DialogHeader>
          <DialogTitle>
            {supplier ? "Editar Fornecedor" : "Novo Fornecedor"}
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...form}>
          <FormContainer onSubmit={form.handleSubmit(onSubmit)}>
            <SupplierForm />
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </FormContainer>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
