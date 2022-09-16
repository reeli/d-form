import {ComponentBuilder} from "../ComponentBuilder";

describe('ComponentBuilder', () => {
  it('should create component builder correctly', () => {
    const componentBuilder = new ComponentBuilder();
    const field = componentBuilder
      .string({name: "myName", widget: "text"})
      .maxLength(10)
      .minLength(1)
      .addonBefore("before")
      .addonAfter("after")
      .build()

    expect(field).toEqual({
      name: "myName",
      widget: "text",
      maxLength: 10,
      minLength: 1,
      addonBefore: "before",
      addonAfter: "after",
    })
  });

  it('should override required props', () => {
    const componentBuilder = new ComponentBuilder();
    const field = componentBuilder
      .string({name: "myName", widget: "textarea"})
      .name("myNewName")
      .widget("textarea")
      .maxLength(10)
      .minLength(1)
      .addonBefore("before")
      .addonAfter("after")
      .build()

    expect(field).toEqual({
      name: "myNewName",
      widget: "textarea",
      maxLength: 10,
      minLength: 1,
      addonBefore: "before",
      addonAfter: "after",
    })
  });
});
