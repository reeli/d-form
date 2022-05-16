import { Controller, useWatch } from "react-hook-form";
import { Rule, Widget as TWidget } from "./types";
import { checkAndParseOperator, parseRules, pickDependentFields } from "./utils";
import { useContext, useState, useEffect } from "react";
import { FormRenderContext } from "./FormRenderContext";

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
  const FormLabel = widgetComponents["formLabel"];

  const changed = useWatch({ control, name: pickDependentFields(visible) });

  const [shouldShow, setShouldShow] = useState(
    checkAndParseOperator({
      operators,
      data: visible,
      value: getValues()[name],
      formValue: getValues(),
    }),
  );

  useEffect(() => {
    setShouldShow(
      checkAndParseOperator({ operators, data: visible, value: getValues()[name], formValue: getValues() }),
    );
  }, [changed]);

  if (!Widget || !shouldShow) {
    return null;
  }

  return (
    <Controller
      name={name}
      rules={{
        validate: parseRules({
          rules: rules as Rule[],
          getValues,
          operators,
        }),
      }}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <div css={{ marginTop: 8, marginBottom: 8 }}>
          <FormLabel>{label}</FormLabel>
          <div>
            <Widget {...others} {...props} {...field} value={field.value} fullWidth />
          </div>
          {formState.errors[name]?.message && <FormLabel error>{formState.errors[name].message}</FormLabel>}
        </div>
      )}
    />
  );
};
