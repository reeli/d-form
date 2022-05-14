import { Controller, useWatch } from "react-hook-form";
import { Rule, Widget as TWidget } from "./types";
import { checkAndParseOperator, parseRules, pickDependentFields } from "./utils";
import { Fragment, useContext } from "react";
import { FormRenderContext } from "./FormRenderContext";
import { every } from "lodash";

export const Field = ({
  name,
  widget,
  type,
  defaultValue,
  rules,
  props = {},
  visible = true,
  label,
  ...others
}: TWidget & { name: string }) => {
  const { operators, widgetComponents, control, getValues, formState } = useContext(FormRenderContext);
  const Widget = widgetComponents[widget!];
  const FormLabel = widgetComponents["formLabel"]

  const formValue = getValues();
  const values = useWatch({
    name: pickDependentFields(visible),
    defaultValue: checkAndParseOperator({
      operators,
      data: visible,
      value: formValue[name],
      formValue,
    }),
  });

  const shouldShow = every(values);

  if (!Widget || !shouldShow) {
    return null;
  }

  return (
    <Controller
      name={name}
      rules={{
        validate: parseRules({
          rules: rules as Rule[],
          formValue: getValues(),
          operators,
        }),
      }}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => {
        if (!shouldShow) {
          return <Fragment />;
        }
        return (
          <Fragment>
            <FormLabel>{label}</FormLabel>
            <Widget {...others} {...props} {...field} value={field.value} />
            {formState.errors[name]?.message && <FormLabel error>{formState.errors[name].message}</FormLabel>}
          </Fragment>
        );
      }}
    />
  );
};
