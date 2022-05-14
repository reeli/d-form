import {
  Button,
  ButtonProps,
  Select,
  SwitchProps,
  TextField,
  TextFieldProps,
  SelectProps,
  MenuItem,
  Checkbox,
  FormLabel,
} from "@material-ui/core";
import { FC, forwardRef } from "react";
import { FieldValue } from "./types";

const MyButton: FC<ButtonProps & { text: string }> = forwardRef(({ text, ...others }, ref) => {
  return (
    <Button {...others} ref={ref} variant={"contained"} color={"primary"}>
      {text}
    </Button>
  );
});

type MyCheckBoxProps = Omit<SwitchProps, "checked"> & {
  value: boolean;
  onChange: (value: FieldValue) => void;
};

const MyCheckbox: FC<MyCheckBoxProps> = forwardRef(({ value, onChange, ...others }, ref) => (
  <Checkbox {...others} ref={ref} checked={value} onChange={(_, checked) => onChange(checked)} />
));

const MyTextField: FC<TextFieldProps & { value: string }> = forwardRef(({ value = "", ...others }, ref) => (
  <TextField value={value} {...others} ref={ref} size={"medium"} />
));

interface Option<TValue = any> {
  id: string;
  label: string;
  value: TValue;
}

const MySelect: FC<SelectProps & { value: string; options: Option[] }> = forwardRef(
  ({ value = "", options, label, ...others }, ref) => (
    <Select value={value} {...others} ref={ref}>
      {options.map((option) => (
        <MenuItem value={option.value} key={option.id}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  ),
);

const MyNumberInput: FC<TextFieldProps & { value: number }> = forwardRef(({ value="", label, ...others }, ref) => (
  <TextField type={"number"} label={label} value={value} {...others} ref={ref} />
));

const formComponents = {
  text: MyTextField,
  select: MySelect,
  checkbox: MyCheckbox,
  number: MyNumberInput,
};

export const widgetComponents = {
  ...formComponents,
  submit: MyButton,
  formLabel: FormLabel,
};
