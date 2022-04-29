import { ValidationError } from "../../errors/validation-error";
import { ValidatorRules } from "./validator-rules";

function assertIsValid({ value, property, rule, error }) {
  expect(() => {
    ValidatorRules.values(value, property)[rule]();
  }).toThrow(error);
}

describe("Validator rules unit tests", () => {
  it("values method", () => {
    const validator = ValidatorRules.values("VALUE", "FIELD");

    expect(validator).toBeInstanceOf(ValidatorRules);
    expect(validator["value"]).toBe("VALUE");
    expect(validator["property"]).toBe("FIELD");
  });

  it("Required validation rule must throw exception when value is empty", () => {
    const arrange = [
      {
        value: undefined,
        property: "FIELD",
      },
      {
        value: "",
        property: "FIELD",
      },
      {
        value: null,
        property: "FIELD",
      },
    ];

    arrange.forEach(item => {
      assertIsValid({
        value: item.value,
        property: item.property,
        error: new ValidationError("FIELD is required"),
        rule: "required",
      });
    });
  });

  it("Required validation rule must NOT throw exception when value is valid", () => {
    const arrange = [
      {
        value: "VALUE",
        property: "FIELD",
        messageError: "FIELD is required",
      },
      {
        value: 0,
        property: "FIELD",
        messageError: "FIELD is required",
      },
      {
        value: 5,
        property: "FIELD",
        messageError: "FIELD is required",
      },
      {
        value: true,
        property: "FIELD",
        messageError: "FIELD is required",
      },
    ];

    arrange.forEach(item => {
      const validator = ValidatorRules.values(item.value, item.property);
      expect(() => validator.required()).not.toThrow("FIELD is required");
    });
  });
});
