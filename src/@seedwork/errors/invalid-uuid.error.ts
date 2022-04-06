export default class InvalidUUidError extends Error {
  constructor(message?: string) {
    super(message || "ID  must be a valid UUID");
    this.name = "InvalidUuidError";
  }
}
