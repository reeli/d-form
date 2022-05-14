import Editor from "@monaco-editor/react";
import { Form } from "../src/Form";
import { FormSpec } from "../src/types";
import { useState } from "react";
import { debounce } from "lodash";

const formSpec: FormSpec = {
  formId: "001",
  title: "测试表单",
  description: "简单表单例子（通过 DSL 描述 UI）",
  widgets: [
    {
      name: "username",
      type: "string",
      widget: "text",
      label: "用户名",
    },
    {
      name: "password",
      type: "string",
      widget: "text",
      label: "密码",
      props: {
        type: "password",
      },
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
      <h1>简单表单</h1>
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
  path: "/simple-form",
  label: "简单表单",
  order: 1
};
