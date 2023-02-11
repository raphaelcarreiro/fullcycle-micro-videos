import { validateSync } from "class-validator";
import ValidatorFieldsInterface, { FieldErrors } from "./validator-fields.interface";

export class ClassValidatorFields<PropsValidated> implements ValidatorFieldsInterface<PropsValidated> {
  errors: FieldErrors;
  validatedData: PropsValidated;

  validate(data: any): boolean {
    const errors = validateSync(data);

    this.validatedData = data;

    if (errors.length) {
      this.errors = {};

      for (const error of errors) {
        const field = error.property;

        if (error.constraints) {
          this.errors[field] = Object.values(error.constraints);
        }
      }

      return false;
    }

    return true;
  }
}
