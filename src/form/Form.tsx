import { FormProvider, useForm } from "react-hook-form";
import { FormValue, FormSpec } from "./types";
import { FieldList } from "./FieldList";
import { validationFnList, widgetComponents } from "./utils";
import { FormRenderProvider } from "./FormRenderContext";

interface FormProps {
  formSpec: FormSpec;
}

export const Form = ({ formSpec }: FormProps) => {
  const methods = useForm({
    mode: "all",
    // defaultValues: {
    //   maritalStatus: false,
    //   showMore: false,
    // },
  });

  const onSubmit = (data: FormValue) => {
    alert(JSON.stringify(data, null, 2));
    // axios.post(formSpec.actions.client.onSubmit.apiUrl, data);
  };

  // const onSubmitSuccess = () => {};
  //
  // const onSubmitFail = () => {};

  const Button = widgetComponents["submit"];

  return (
    <FormRenderProvider
      value={{
        validationFnList,
        widgetComponents,
      }}
    >
      <FormProvider {...methods}>
        {formSpec.title && <div>{formSpec.title}</div>}
        {formSpec.description && <div>{formSpec.description}</div>}
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FieldList widgets={formSpec.widgets} />
          <Button type={"submit"} text={formSpec.submit.confirmText} />
        </form>
      </FormProvider>
    </FormRenderProvider>
  );
};
