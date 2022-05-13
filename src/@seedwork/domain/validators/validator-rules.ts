import { ValidationError } from "../../../@seedwork/errors/validation-error";

export class ValidatorRules {
  constructor(private value: any, private property: string) {}

  static values(value: any, property: string) {
    return new ValidatorRules(value, property);
  }

  required(): Omit<this, "required"> {
    if (!this.value && this.value !== 0) {
      throw new ValidationError(`${this.property} is required`);
    }

    return this;
  }

  string(): Omit<this, "string"> {
    if (!isEmpty(this.value) && typeof this.value !== "string") {
      throw new ValidationError(`${this.property} must be a string`);
    }

    return this;
  }

  maxLength(max: number): Omit<this, "maxLength"> {
    if (!isEmpty(this.value) && this.value.length > max) {
      throw new ValidationError(
        `${this.property} must be less or equal then ${max} characters`
      );
    }

    return this;
  }

  boolean(): Omit<this, "boolean"> {
    if (!isEmpty(this.value) && typeof this.value !== "boolean") {
      throw new ValidationError(`${this.property} must be a boolean`);
    }

    return this;
  }
}

export function isEmpty(value: any) {
  return value === undefined || value === null;
}
