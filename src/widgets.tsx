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
import { FieldValue } from "./types";

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
