import { useForm } from "react-hook-form";
import { FormValue, FormSpec } from "./types";
import { FieldList } from "./FieldList";
import { FormRenderProvider } from "./FormRenderContext";
import { widgetComponents } from "./widgets";
import { operators } from "./operators";

interface FormProps {
  formSpec: FormSpec;
}

export const Form = ({ formSpec }: FormProps) => {
  const methods = useForm({
    mode: "all",
  });

  const onSubmit = (data: FormValue) => {
    alert(JSON.stringify(data, null, 2));
  };

  const Button = widgetComponents["submit"];
  const FormLabel = widgetComponents["formLabel"];

  return (
    <FormRenderProvider operators={operators} widgetComponents={widgetComponents} {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {formSpec.title && <h3 css={{ margin: 0 }}>{formSpec.title}</h3>}
        {formSpec.description && <FormLabel color={"secondary"}>{formSpec.description}</FormLabel>}
        <FieldList widgets={formSpec.widgets} />
        <Button type={"submit"} text={formSpec.submit.confirmText} />
      </form>
    </FormRenderProvider>
  );
};
