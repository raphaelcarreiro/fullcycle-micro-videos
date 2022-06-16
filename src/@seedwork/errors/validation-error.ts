import { FieldErrors } from "@seedwork/domain/validators/validator-fields.interface";

export class ValidationError extends Error {}

export class EntityValidationError extends Error {
  constructor(public error: FieldErrors) {
    super("Entity validation Error");
    this.name = "EntityValidationError";
  }
}
