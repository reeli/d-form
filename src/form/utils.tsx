import {
  Button,
  ButtonProps,
  Select,
  SwitchProps,
  TextField,
  TextFieldProps,
  SelectProps,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
} from "@material-ui/core";
import { FC, forwardRef } from "react";
import { FieldValue, FormValue, Operator, Rule, ValidateFnCore, ValidateFnList } from "./types";
import { Validate } from "react-hook-form";
import { get, isEqual, every } from "lodash";

const MyButton: FC<ButtonProps & { text: string }> = forwardRef(({ text, ...others }, ref) => {
  return (
    <Button {...others} ref={ref} variant={"contained"} color={"primary"}>
      {text}
    </Button>
  );
});

const MyCheckbox: FC<SwitchProps & { value: boolean; label: string; onChange: (value: FieldValue) => void }> =
  forwardRef(({ value, label, onChange, ...others }, ref) => {
    return (
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <div>
          <Checkbox {...others} checked={value} ref={ref} onChange={(_, checked) => onChange && onChange(checked)} />
        </div>
      </FormControl>
    );
  });

const MyTextField: FC<TextFieldProps & { value: string }> = forwardRef(({ value = "", label, ...others }, ref) => {
  return (
    <FormControl fullWidth>
      <TextField label={label} value={value} {...others} ref={ref} />
    </FormControl>
  );
});

interface Option<TValue = any> {
  id: string;
  label: string;
  value: TValue;
}

const MySelect: FC<SelectProps & { value: string; options: Option[] }> = forwardRef(
  ({ value = "", options, label, ...others }, ref) => {
    return (
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select value={value} {...others} ref={ref}>
          {options.map((option) => (
            <MenuItem value={option.value} key={option.id}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  },
);

const MyNumberInput: FC<TextFieldProps & { value: number }> = forwardRef(({ value, label, ...others }, ref) => {
  return (
    <FormControl fullWidth>
      <TextField type={"number"} label={label} value={value} {...others} ref={ref} />
    </FormControl>
  );
});

export const widgetComponents = {
  text: MyTextField,
  select: MySelect,
  checkbox: MyCheckbox,
  number: MyNumberInput,
  submit: MyButton,
};

interface ParseRuleParams {
  rules: Rule[];
  formValue: FormValue;
  fnList: ValidateFnList;
}

export const parseRules = ({ rules, fnList, formValue }: ParseRuleParams): Validate<FieldValue> => {
  return (value: FieldValue) => {
    if (!rules) {
      return undefined;
    }

    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i];

      if ((rule.when && parseOperator(rule.when, fnList)(value, formValue)) || !rule.when) {
        if (!parseOperator(rule.rule, fnList)(value, formValue)) {
          return rule.errorMsg;
        }
      }
    }

    return undefined;
  };
};

export const parseOperator =
  (operator: Operator, fnList: ValidateFnList): ValidateFnCore =>
  (value, formValue) => {
    const [fnName, ...others] = operator;
    const args: any[] = [];

    others.forEach((item) => {
      if (isOperator(item)) {
        args.push(parseOperator(item, fnList)(value, formValue));
      } else {
        args.push(item);
      }
    });

    return fnList[fnName] && fnList[fnName](...args)(value, formValue);
  };

const isOperator = (data: any): data is Operator => Array.isArray(data);

export const pickDependentFields = (data: any): string[] => {
  if (isOperator(data)) {
    let collections: string[] = [];
    const [name, ...others] = data;

    if (name === "get") {
      collections = collections.concat(others[0] as string);
    }

    others.forEach((item) => {
      if (Array.isArray(item)) {
        collections = collections.concat(pickDependentFields(item));
      }
    });

    return collections;
  }

  return [];
};

interface ParseOperatorParams {
  data: any;
  value: FieldValue;
  formValue: FormValue;
  fnList: ValidateFnList;
}

export const checkAndParseOperator = ({ data, formValue, value, fnList }: ParseOperatorParams) => {
  if (isOperator(data)) {
    return parseOperator(data, fnList)(value, formValue);
  }

  return data;
};

const required = () => (value: FieldValue, _formValue: FormValue) =>
  value !== undefined && value !== null && value !== "";
const lte = (num: number) => (value: FieldValue, _formValue: FormValue) => value <= num;
const gte = (num: number) => (value: FieldValue, _formValue: FormValue) => value >= num;
const maxLength = (num: number) => (value: FieldValue, _formValue: FormValue) => value.length <= num;
const minLength = (num: number) => (value: FieldValue, _formValue: FormValue) => value.length >= num;
const getValue = (name: string) => (_value: FieldValue, formValue: FormValue) => get(formValue, name);
const eq = (a: any, b: any) => (_value: FieldValue, _formValue: FormValue) => isEqual(a, b);
const all =
  (...args: any[]) =>
  (_value: FieldValue, _formValue: FormValue) =>
    every(args);

export const validationFnList = {
  lte,
  gte,
  maxLength,
  minLength,
  required,
  get: getValue,
  eq,
  all
};
