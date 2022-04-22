import { deepFreeze } from "./objec";

describe("Object unit tests", () => {
  it("should not freeze  a scalar value", () => {
    const str = deepFreeze("a");
    expect(typeof str).toBe("string");

    let boolean = deepFreeze(true);
    expect(typeof boolean).toBe("boolean");

    boolean = deepFreeze(false);
    expect(typeof boolean).toBe("boolean");
  });

  it("must be a immutable object", () => {
    const object = deepFreeze({
      prop1: "value1",
      deep: {
        prop2: "value2",
        prop3: new Date(),
      },
    });

    expect(() => {
      (object as any).prop1 = "teste" as any;
    }).toThrow(TypeError);

    expect(() => {
      (object as any).deep.prop2 = "teste" as any;
    }).toThrow(TypeError);

    expect(object.deep.prop3).toBeInstanceOf(Date);
  });
});
