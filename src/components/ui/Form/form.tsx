import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import styled from "styled-components";

// Estilos para o FormItem
const FormItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

interface FormLabelStyledProps {
  error?: boolean;
}

// Estilos para o FormLabel
const FormLabelStyled = styled(LabelPrimitive.Root)<FormLabelStyledProps>`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ error }) => (error ? "#dc2626" : "#374151")};
`;

// Estilos para o FormDescription
const FormDescriptionStyled = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
`;

// Estilos para o FormMessage
const FormMessageStyled = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  color: #dc2626;
`;

// Componente Form (raiz)
const Form = FormProvider;

// Contexto para FormField
type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

// Componente FormField
const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

// Hook para acessar o contexto do FormField
const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

// Contexto para FormItem
type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

// Componente FormItem
const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <FormItemContainer ref={ref} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = "FormItem";

// Componente FormLabel
const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & {
    error?: boolean;
  }
>(({ ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <FormLabelStyled
      ref={ref}
      error={!!error}
      htmlFor={formItemId}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

// Componente FormControl
const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

// Componente FormDescription
const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return <FormDescriptionStyled ref={ref} id={formDescriptionId} {...props} />;
});
FormDescription.displayName = "FormDescription";

// Componente FormMessage
const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? "") : children;

  if (!body) {
    return null;
  }

  return (
    <FormMessageStyled ref={ref} id={formMessageId} {...props}>
      {body}
    </FormMessageStyled>
  );
});
FormMessage.displayName = "FormMessage";

// Exportação dos componentes
export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
};
