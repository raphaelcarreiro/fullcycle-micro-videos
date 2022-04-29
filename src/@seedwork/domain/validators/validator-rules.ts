import { ValidationError } from "../../../@seedwork/errors/validation-error";

export class ValidatorRules {
  constructor(private value: any, private property: string) {}

  static values(value: any, property: string) {
    return new ValidatorRules(value, property);
  }

  required(): this {
    if (!this.value && this.value !== 0) {
      throw new ValidationError(`${this.property} is required`);
    }

    return this;
  }

  string(): this {
    if (typeof this.value !== "string") {
      throw new ValidationError(`${this.property} must be a string`);
    }

    return this;
  }

  maxLength(max: number): this {
    if (this.value.length > max) {
      throw new ValidationError(
        `${this.property} must be less or equal then ${max} characters`
      );
    }

    return this;
  }
}
