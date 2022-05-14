import { createContext, FC, PropsWithChildren } from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";
import { Operators } from "./types";

type FormRenderContextParams = {
  operators: Operators;
  widgetComponents: { [key: string]: FC<any> };
} & UseFormReturn;

export const FormRenderContext = createContext<FormRenderContextParams>({
  operators: {},
  widgetComponents: {},
  control: {},
} as FormRenderContextParams);

export const FormRenderProvider: FC<PropsWithChildren<FormRenderContextParams>> = ({
  children,
  operators,
  widgetComponents,
  ...others
}) => {
  return (
    <FormRenderContext.Provider value={{ operators, widgetComponents, ...others }}>
      <FormProvider {...others}>{children}</FormProvider>
    </FormRenderContext.Provider>
  );
};
