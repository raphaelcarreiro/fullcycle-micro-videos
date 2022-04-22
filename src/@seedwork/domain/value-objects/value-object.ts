import { deepFreeze } from "../utils/objec";

export abstract class ValueObject<Value = any> {
  protected readonly _value: Value;

  constructor(value: Value) {
    this._value = deepFreeze(value);
  }

  get value(): Value {
    return this._value;
  }

  toString = () => {
    if (typeof this.value !== "object" || this.value === null) {
      try {
        return String(this.value);
      } catch (err) {
        return this.value + "";
      }
    }

    const value = String(this.value);

    return value === "[object Object]" ? JSON.stringify(this.value) : value;
  };
}
