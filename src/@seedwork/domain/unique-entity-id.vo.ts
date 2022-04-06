import { v4, validate as uuidValidate } from "uuid";
import InvalidUUidError from "../errors/invalid-uuid.error";

export default class UniqueEntityId {
  constructor(public readonly id?: string) {
    this.id = id || v4();
    this.validate();
  }

  private validate() {
    const isValid = uuidValidate(this.id as string);

    if (!isValid) {
      throw new InvalidUUidError();
    }
  }
}
