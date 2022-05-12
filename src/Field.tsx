import { Controller, useFormContext, useWatch } from "react-hook-form";
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
  ...others
}: TWidget & { name: string }) => {
  const { control, getValues, formState } = useFormContext();
  const { validationFnList, widgetComponents } = useContext(FormRenderContext);
  const Widget = widgetComponents[widget!];

  const formValue = getValues();
  const values = useWatch({
    name: pickDependentFields(visible),
    defaultValue: checkAndParseOperator({
      fnList: validationFnList,
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
          fnList: validationFnList,
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
            <Widget {...others} {...props} {...field} value={field.value} />
            {formState.errors[name]?.message && <div css={{ color: "red" }}>{formState.errors[name].message}</div>}
          </Fragment>
        );
      }}
    />
  );
};
