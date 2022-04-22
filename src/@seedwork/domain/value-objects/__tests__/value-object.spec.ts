import { ValueObject } from "../value-object";

class StubValueObject extends ValueObject {}

describe("Value objects tests", () => {
  it("shoud set value", () => {
    let vo = new StubValueObject("string value");
    expect(vo.value).toBe("string value");

    vo = new StubValueObject({ prop1: "value1" });
    expect(vo.value).toStrictEqual({ prop1: "value1" });
  });

  it("Should convert to a string", () => {
    const date = new Date();

    const arrange = [
      { received: "fake test", expected: "fake test" },
      { received: 0, expected: "0" },
      { received: 1, expected: "1" },
      { received: 5, expected: "5" },
      { received: true, expected: "true" },
      { received: false, expected: "false" },
      { received: date, expected: date.toString() },
      {
        received: { prop1: "value1" },
        expected: JSON.stringify({ prop1: "value1" }),
      },
    ];

    arrange.forEach((value) => {
      const stubValueObject = new StubValueObject(value.received);
      expect(`${stubValueObject}`).toBe(value.expected);
    });
  });

  it("must be a immutable object", () => {
    const object = {
      prop1: "value1",
      deep: {
        prop2: "value2",
        prop3: new Date(),
      },
    };

    const vo = new StubValueObject(object);

    expect(() => {
      (vo as any).value.prop1 = "TEST";
    }).toThrow(TypeError);

    expect(() => {
      (vo as any).value.deep.prop2 = "TESTE";
    }).toThrow(TypeError);

    expect(vo.value.deep.prop3).toBeInstanceOf(Date);
  });
});
