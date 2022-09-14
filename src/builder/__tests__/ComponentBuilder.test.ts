import {ComponentBuilder} from "../ComponentBuilder";

describe('ComponentBuilder', () => {
  it('should create component builder correctly', () => {
    const componentBuilder = new ComponentBuilder();
    const field = componentBuilder
      .string()
      .name("myName")
      .maxLength(10)
      .minLength(1)
      .addonBefore("before")
      .addonAfter("after")
      .build()

    expect(field).toEqual({
      name: "myName",
      maxLength: 10,
      minLength: 1,
      addonBefore: "before",
      addonAfter: "after",
    })
  });
});
