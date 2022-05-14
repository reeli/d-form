import { FieldValue, FormValue } from "./types";
import { every, get, isEqual } from "lodash";

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
const max = (num: number) => (value: FieldValue, _formValue: FormValue) => value <= num;
const min = (num: number) => (value: FieldValue, _formValue: FormValue) => value >= num;

export const operators = {
  lte,
  gte,
  max,
  min,
  maxLength,
  minLength,
  required,
  get: getValue,
  eq,
  all,
};
