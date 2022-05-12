import { createContext, FC } from "react";
import { ValidateFnList } from "./types";

export const FormRenderContext = createContext<{
  validationFnList: ValidateFnList;
  widgetComponents: { [key: string]: FC<any> };
}>({
  validationFnList: {},
  widgetComponents: {},
});

export const FormRenderProvider = FormRenderContext.Provider;
