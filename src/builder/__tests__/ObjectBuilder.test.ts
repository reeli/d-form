import {ObjectBuilder} from "../ObjectBuilder";

describe('ObjectBuilder', () => {
  it('should create object correctly by given type', () => {
    const data = ObjectBuilder<{ name: string; age: number; address: string }>()
      .name("Ming")
      .age(12)
      .address("Chengdu")
      .build()

    expect(data).toEqual({
      name: "Ming",
      age: 12,
      address: "Chengdu",
    })
  });

  it('should create nested object correctly by given type', () => {
    const data = ObjectBuilder<{ name: string; age: number; address: { city: string; street?: string; postcode: number; } }>()
      .name("Ming")
      .age(12)
      .address({
        city: "Chengdu",
        postcode: 123456
      })
      .build()

    expect(data).toEqual({
      name: "Ming",
      age: 12,
      address: {
        city: "Chengdu",
        postcode: 123456
      },
    })
  });

  it("should handle optional props", () => {
    const data = ObjectBuilder<{ name: string; age?: number; address?: string }>()
      .name("Ming")
      .age(12)
      .address("Chengdu")
      .build()

    expect(data).toEqual({
      name: "Ming",
      age: 12,
      address: "Chengdu"
    })
  })

  it("should override props", () => {
    const data = ObjectBuilder<{ name: string; age: number; address: { city: string; street?: string; postcode: number; } }>()
      .name("Ming")
      .age(12)
      .address({
        city: "Chengdu",
        postcode: 123456
      })
      .address({
        city: "Chengdu",
        street: "Software",
        postcode: 100
      })
      .build()

    expect(data).toEqual({
      name: "Ming",
      age: 12,
      address: {
        city: "Chengdu",
        street: "Software",
        postcode: 100
      }
    })
  })
});
