import { ValidationError } from "../../../errors/validation-error";
import { ValidatorRules } from "../validator-rules";

type Values = {
  value: any;
  property: string;
};

type ExpectedRule = {
  value: any;
  property: string;
  rule: keyof ValidatorRules;
  error: ValidationError;
  params?: any[];
};

function assertIsValid(expectedRule: ExpectedRule) {
  expect(() => runRule(expectedRule)).not.toThrow(expectedRule.error);
}

function assertIsInvalid(expectedRule: ExpectedRule) {
  expect(() => runRule(expectedRule)).toThrow(expectedRule.error);
}

function runRule({ value, property, rule, params }: Omit<ExpectedRule, "error">) {
  const validator = ValidatorRules.values(value, property);
  const method = validator[rule] as any;

  method.apply(validator, params);
}

describe("Validator rules unit tests", () => {
  it("values method", () => {
    const validator = ValidatorRules.values("VALUE", "FIELD");

    expect(validator).toBeInstanceOf(ValidatorRules);
    expect(validator["value"]).toBe("VALUE");
    expect(validator["property"]).toBe("FIELD");
  });

  it("Required validation rule must throw exception when value is empty", () => {
    const arrange: Values[] = [
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
      assertIsInvalid({
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
      },
      {
        value: 0,
        property: "FIELD",
      },
      {
        value: 5,
        property: "FIELD",
      },
      {
        value: true,
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

  it("String validation rule must throw exception when value is not a string", () => {
    const arrange: Values[] = [
      {
        value: 0,
        property: "FIELD",
      },
      {
        value: true,
        property: "FIELD",
      },
    ];

    arrange.forEach(item => {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        error: new ValidationError("FIELD must be a string"),
        rule: "string",
      });
    });
  });

  it("string validation rule must NOT throw exception when value is a string", () => {
    const arrange = [
      {
        value: "VALUE",
        property: "FIELD",
      },
    ];

    arrange.forEach(item => {
      assertIsValid({
        value: item.value,
        property: item.property,
        error: new ValidationError("FIELD must be a string"),
        rule: "string",
      });
    });
  });

  it("Max length validation rule must throw exception when string length is grather than", () => {
    const arrange: Values[] = [
      {
        value: "VALUE",
        property: "FIELD",
      },
    ];

    arrange.forEach(item => {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        error: new ValidationError("FIELD must be less or equal then 2 characters"),
        rule: "maxLength",
        params: [2],
      });
    });
  });

  it("Max length validation rule must not throw exception when string length is less or equal than", () => {
    const arrange: Values[] = [
      {
        value: undefined,
        property: "FIELD",
      },
      {
        value: 0,
        property: "FIELD",
      },
      {
        value: "VALUE",
        property: "FIELD",
      },
    ];

    arrange.forEach(item => {
      assertIsValid({
        value: item.value,
        property: item.property,
        error: new ValidationError("FIELD must be less or equal then 2 characters"),
        rule: "maxLength",
        params: [10],
      });
    });
  });

  it("Boolean validation rule must throw exception when the type is not boolean", () => {
    const arrange: Values[] = [
      {
        value: "VALUE",
        property: "FIELD",
      },
      {
        value: 0,
        property: "FIELD",
      },
    ];

    arrange.forEach(item => {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        error: new ValidationError("FIELD must be a boolean"),
        rule: "boolean",
      });
    });
  });

  it("Boolean rule must not throw exception when the type is a boolean", () => {
    const arrange: Values[] = [
      {
        value: undefined,
        property: "FIELD",
      },
      {
        value: null,
        property: "FIELD",
      },
      {
        value: true,
        property: "FIELD",
      },
      {
        value: false,
        property: "FIELD",
      },
    ];

    arrange.forEach(item => {
      assertIsValid({
        value: item.value,
        property: item.property,
        error: new ValidationError("FIELD must be a boolean"),
        rule: "boolean",
      });
    });
  });

  it("should throw a validation error when combine two or more validation rules", () => {
    let validator = ValidatorRules.values(null, "field");
    expect(() => validator.required().string().maxLength(5)).toThrow(new ValidationError("field is required"));

    validator = ValidatorRules.values(5, "field");

    expect(() => validator.required().string().maxLength(5)).toThrow(new ValidationError("field must be a string"));

    validator = ValidatorRules.values("value", "field");

    expect(() => validator.required().string().maxLength(2)).toThrow(
      new ValidationError("field must be less or equal then 2 characters")
    );
  });

  it("should valid when two or more validation rules", () => {
    expect.assertions(0);

    ValidatorRules.values("VALUE", "field").required().string();
    ValidatorRules.values("VALUE", "field").required().string().maxLength(5);
  });
});
