import { FieldValue, FormValue } from "./types";
import { every, get, isEqual } from "lodash";

// 固定参数优于不定参数
// gte(8) minLength(10)，先得到一个表达式，再传入 value，始终是 value 的表达式的入参进行比较，value 最小 length 是不是 10， value 是否大于等于 8
// 表达式分类：参考编程语言，运算：算数运算（加减乘除）、比较运算（大于、等于、小于）、时间运算 条件语句：if-else, if， 表达式如何组合验证：allOf, oneOf

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
const when = (matched: number)=>(value:FieldValue, _formValue: FormValue)=> matched ? value : null

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
  when
};
