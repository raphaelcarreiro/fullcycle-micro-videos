import * as ClassValidatorLib from "class-validator";
import { ClassValidatorFields } from "../class-validator-fields";

class StubClassValidatorFields extends ClassValidatorFields<{ field: string }> {}

describe("ClassValidator fields unit tests", () => {
  it("should initialize errors and validated data variables with null", () => {
    const validator = new StubClassValidatorFields();

    expect(validator.errors).toBeUndefined();
  });

  it("should validate with errors", () => {
    const validator = new StubClassValidatorFields();

    const validateSyncSpy = jest.spyOn(ClassValidatorLib, "validateSync").mockReturnValue([
      {
        property: "field",
        constraints: {
          isRequired: "some error",
        },
      },
    ]);

    expect(validator.validate(null)).toBeFalsy();
    expect(validator.validatedData).toBeNull();
    expect(validator.errors).toStrictEqual({ field: ["some error"] });
    expect(validateSyncSpy).toHaveBeenCalled();
  });

  it("should validate without errors", () => {
    const validator = new StubClassValidatorFields();

    const validateSyncSpy = jest.spyOn(ClassValidatorLib, "validateSync").mockReturnValue([]);

    expect(validator.validate(null)).toBeTruthy();
    expect(validator.validatedData).toBeNull();
    expect(validator.errors).toStrictEqual(undefined);
    expect(validateSyncSpy).toHaveBeenCalled();
  });
});
