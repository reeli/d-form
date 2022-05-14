export interface FormSpec {
  formId: string;
  widgets: Widget[];
  title?: string;
  description?: string;
  actions: {
    client: {
      onSubmit: {
        apiUrl: string;
      };
      onSubmitSuccess: RedirectAction | AlertAction;
      onSubmitFail: RedirectAction | AlertAction;
    };
  };
  submit: {
    confirmText: string;
  };
  validateMode?: "change" | "blur" | "submit";
}

export type Widget =
  | StringWidget
  | NumberWidget
  | DateWidget
  | SelectWidget
  | BooleanWidget
  | FieldArrayWidget
  | FieldGroupWidget;

interface Action {
  type: string;
}

export interface RedirectAction extends Action {
  type: "redirect";
  url: string;
}

export interface AlertAction extends Action {
  type: "alert";
  message?: string;
}

interface BasicWidget {
  name?: string;
  widget?: string;
  label?: string;
  description?: string;
  defaultValue?: any;
  props?: any; // extra props will pass to component
  visible?: Operator | boolean;
}

export interface StringWidget extends BasicWidget {
  name: string;
  type: "string";
  widget: "text" | "textarea";
  placeholder?: string;
  rules?: Rule[];
  maxLength?: number;
  minLength?: number;
  allowClear?: boolean;
  addonBefore?: string;
  addonAfter?: string;
}

interface NumberWidget extends BasicWidget {
  name: string;
  type: "number";
  widget: "number" | "currency";
  placeholder?: string;
  rules?: Rule[];
  max?: number;
  min?: number;
}

interface BooleanWidget extends BasicWidget {
  name: string;
  type: "boolean";
  widget: "switch" | "toggle" | "checkbox";
  rules?: null;
}

interface DateWidget extends BasicWidget {
  name: string;
  type: "date";
  widget: "datepicker" | "rangePicker";
  defaultValue: string | string[];
  placeholder?: string | string[];
  rules?: Rule[] | Rule[][];
  max?: string | Operator;
  min?: string | Operator;
}

interface SelectWidget extends BasicWidget {
  name: string;
  type: "option";
  widget: "select" | "optgroup" | "multiSelect";
  placeholder?: string;
  options: Option[];
  rules?: Rule[];
}

interface Option {
  id: string;
  label: string;
  value: string;
}

interface FieldArrayWidget extends BasicWidget {
  name: string;
  type: "array";
  max: number;
  min: number;
  items: Widget[];
  rules: Rule[];
}

interface FieldGroupWidget extends BasicWidget {
  type: "group";
  section: {
    title: string;
    widgets: Widget[];
  };
  rules?: null;
}

type Arg = Operator | string | number | boolean;
export type Operator = [item1: string, ...otherItems: Arg[]];
export type FormValue = Record<string, any>;
export type FieldValue = any;

export interface Rule {
  rule: Operator;
  when?: Operator;
  errorMsg?: string;
}

type OperatorCore = (value: FieldValue, formValue: FormValue) => boolean | FieldValue;
export type Operators = { [key: string]: (...arg: any[]) => OperatorCore };
