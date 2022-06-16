import { ClassValidatorFields } from "../validators/class-validator-fields";
import { FieldErrors } from "../validators/validator-fields.interface";
import { objectContaining } from "expect";
import { EntityValidationError } from "../../../@seedwork/errors/validation-error";

type Expected =
  | {
      validator: ClassValidatorFields<any>;
      data: any;
    }
  | (() => any);

expect.extend({
  containsErrorMessages(expected: Expected, received: FieldErrors) {
    if (typeof expected === "function") {
      try {
        expected();
        return isValidResponse();
      } catch (err) {
        const error = err as EntityValidationError;

        return assertContainsErrorMessages(error.error, received);
      }
    }

    const { validator, data } = expected;

    const isValid = validator.validate(data);

    if (isValid) {
      return isValidResponse();
    }

    return assertContainsErrorMessages(validator.errors, received);
  },
});

function isValidResponse() {
  return {
    pass: false,
    message: () => "The data is valid",
  };
}

function assertContainsErrorMessages(expected: FieldErrors, received: FieldErrors) {
  const matched = objectContaining(received).asymmetricMatch(expected);

  if (matched) {
    return { pass: true, message: () => "" };
  }

  return {
    pass: false,
    message: () =>
      `The validation errors not contains ${JSON.stringify(received)}. Current: ${JSON.stringify(expected)}`,
  };
}
