const schema = {
  title: "A registration form",
  description: "A simple form example.",
  type: "object",
  required: ["firstName", "lastName"],
  properties: {
    firstName: {
      type: "string",
      title: "First name",
      default: "Chuck",
    },
    lastName: {
      type: "string",
      title: "Last name",
    },
    telephone: {
      type: "string",
      title: "Telephone",
      minLength: 10,
    },
  },
};

// restriction, UI 样式(required), 组件类型都和 validation 相关，通过 validation 得到 metaData 信息，可以辅助 UI 展示
const rules = [
  {
    rule: ["required"],
    // errorMsg: "密码为必填项",
  },
  {
    rule: ["minLength", 8],
    // errorMsg: "最小长度为 8 个字符",
  },
  {
    rule: [
      "when",
      ["lt", ["get", "age"], 12],
      ["maxLength", 16]
    ],
    errorMsg: "最大长度为 16 个字符",
    // when: ["lt", ["get", "age"], 12]
  },
];
//
// ([
//   "required",
//    [
//      "select",
//      ["when", ["get", "age", ["eq", 12]],  ["err", "xxxxx",["minLength", 8]]],
//      ["minLength", 8]
//   ]
// ])

// validation: rules, deps
// ui: required(),minLength(8),minLength(10), deps

// minLength error template ${16}


// when("", matches(/a-z/+， 只能是小写字母))
// when("", matches(/0-8/+， 只能输入字母))
