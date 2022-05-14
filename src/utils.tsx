import { FieldValue, FormValue, Operator, Rule, Operators } from "./types";
import { Validate } from "react-hook-form";

interface ParseRuleParams {
  rules: Rule[];
  formValue: FormValue;
  operators: Operators;
}

export const parseRules = ({ rules, operators, formValue }: ParseRuleParams): Validate<FieldValue> => {
  return (value: FieldValue) => {
    if (!rules) {
      return undefined;
    }

    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i];

      if ((rule.when && parseOperator(rule.when, operators)(value, formValue)) || !rule.when) {
        if (!parseOperator(rule.rule, operators)(value, formValue)) {
          return rule.errorMsg;
        }
      }
    }

    return undefined;
  };
};

export const parseOperator =
  (operator: Operator, fnList: Operators) =>
  (value: FieldValue, formValue: FormValue): boolean | FieldValue => {
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
  operators: Operators;
}

export const checkAndParseOperator = ({ data, formValue, value, operators }: ParseOperatorParams) => {
  if (isOperator(data)) {
    return parseOperator(data, operators)(value, formValue);
  }

  return data;
};
