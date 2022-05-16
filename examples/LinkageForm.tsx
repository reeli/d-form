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
      type: "group",
      section: {
        title: "显示/隐藏",
        widgets: [
          {
            name: "username",
            type: "string",
            widget: "text",
            label: "用户名",
            placeholder: "请输入用户名",
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
          },
          {
            name: "showMore",
            type: "boolean",
            widget: "checkbox",
            label: "是否展示更多",
            defaultValue: false,
          },
          {
            name: "address",
            type: "string",
            widget: "text",
            label: "请填写住址",
            visible: ["eq", ["get", "showMore"], true],
          },
        ],
      },
    },
    {
      type: "group",
      section: {
        title: "展示不同组件",
        widgets: [
          {
            name: "gender",
            type: "option",
            widget: "select",
            label: "性别",
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
          },
          {
            name: "pet",
            type: "boolean",
            label: "您是否养宠物?",
            widget: "checkbox",
            visible: ["eq", ["get", "gender"], "female"],
          },
          {
            name: "cost",
            type: "number",
            label: "您养宠物一个月需要花费多少?",
            widget: "number",
            visible: ["eq", ["get", "gender"], "female"],
          },
          {
            name: "car",
            type: "boolean",
            label: "您是否有车?",
            widget: "checkbox",
            visible: ["eq", ["get", "gender"], "male"],
          },
        ],
      },
    },
    {
      type: "group",
      section: {
        title: "匹配多个条件",
        widgets: [
          {
            name: "marriage",
            type: "option",
            label: "请选择您的婚姻状况",
            widget: "select",
            options: [
              { id: "001", label: "已婚", value: "married" },
              { id: "002", label: "未婚", value: "single" },
            ],
          },
          {
            name: "kid",
            type: "boolean",
            label: "您是否有孩子?",
            widget: "checkbox",
            visible: ["eq", ["get", "marriage"], "married"],
          },
          {
            name: "kidCount",
            type: "number",
            label: "您有几个孩子?",
            widget: "number",
            visible: ["all", ["eq", ["get", "marriage"], "married"], ["eq", ["get", "kid"], true]],
          },
        ],
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
