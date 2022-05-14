import Editor from "@monaco-editor/react";
import { Form } from "../src/Form";
import { FormSpec } from "../src/types";
import { useState } from "react";
import { debounce } from "lodash";

const formSpec: FormSpec = {
  formId: "003",
  title: "表单联动",
  description: "这是一个测试表单，包含表单联动功能",
  widgets: [
    {
      name: "username",
      type: "string",
      widget: "text",
      label: "用户名",
      placeholder: "请输入用户名",
      rules: [
        {
          rule: ["required"],
          errorMsg: "用户名为必填项",
        },
      ],
    },
    {
      name: "password",
      type: "string",
      widget: "text",
      label: "密码",
      placeholder: "请输入密码",
      props: {
        type: "password",
      },
      rules: [
        {
          rule: ["required"],
          errorMsg: "密码为必填项",
        },
        {
          rule: ["minLength", 8],
          errorMsg: "最小长度为 8 个字符",
        },
        {
          rule: ["maxLength", 16],
          errorMsg: "最大长度为 16 个字符",
        },
      ],
    },
    {
      name: "showMore",
      type: "boolean",
      widget: "checkbox",
      label: "是否展示更多",
      defaultValue: false,
    },
    {
      name: "gender",
      type: "option",
      widget: "select",
      label: "性别",
      visible: ["eq", ["get", "showMore"], true],
      options: [
        {
          id: "1",
          label: "女",
          value: "female",
        },
        {
          id: "2",
          label: "男",
          value: "male",
        },
      ],
      rules: [
        {
          rule: ["required"],
          errorMsg: "性别为必填项",
        },
      ],
    },
  ],
  actions: {
    client: {
      onSubmit: {
        apiUrl: "xxx",
      },
      onSubmitSuccess: {
        type: "redirect",
        url: "xxx",
      },
      onSubmitFail: {
        type: "alert",
      },
    },
  },
  submit: {
    confirmText: "提交",
  },
};

export function Example() {
  const [data, setData] = useState(formSpec);

  const handleChange = debounce((value: any) => {
    try {
      const data = JSON.parse(value);
      console.log(data, "data");
      setData(data);
    } catch (e) {}
  }, 1000);

  return (
    <div>
      <div css={{ display: "flex" }}>
        <div css={{ flex: 1 }}>
          <Editor
            height="500vh"
            defaultLanguage="json"
            defaultValue={JSON.stringify(data, null, 2)}
            options={{ minimap: { enabled: false } }}
            onChange={handleChange}
          />
        </div>
        <div css={{ flex: 1, padding: 20 }}>
          <Form formSpec={data} />
        </div>
      </div>
    </div>
  );
}

export const config = {
  path: "/linkage-form",
  label: "表单联动",
  order: 3,
};
