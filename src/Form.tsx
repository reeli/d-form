import { useForm } from "react-hook-form";
import { FormValue, FormSpec } from "./types";
import { FieldList } from "./FieldList";
import { FormRenderProvider } from "./FormRenderContext";
import {widgetComponents} from "./widgets";
import {operators} from "./operators";

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

  return (
    <FormRenderProvider operators={operators} widgetComponents={widgetComponents} {...methods}>
      {formSpec.title && <div>{formSpec.title}</div>}
      {formSpec.description && <div>{formSpec.description}</div>}
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FieldList widgets={formSpec.widgets} />
        <Button type={"submit"} text={formSpec.submit.confirmText} />
      </form>
    </FormRenderProvider>
  );
};
