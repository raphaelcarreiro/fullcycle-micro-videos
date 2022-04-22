import { validate as uuidValidate } from "uuid";
import InvalidUUidError from "../../../errors/invalid-uuid.error";
import UniqueEntityId from "../unique-entity-id.vo";

describe("UniqueEntityId test", () => {
  const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");

  beforeEach(() => {
    validateSpy.mockClear();
  });

  it("should throw error when uuid is invalid", () => {
    expect(() => new UniqueEntityId("FAKE_ID")).toThrow(InvalidUUidError);
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept a uuid passed in constructor", () => {
    const uuid = "4084eb0a-22ae-48e8-8b06-75e52dd020df";
    const vo = new UniqueEntityId(uuid);

    expect(vo.id).toBe(uuid);
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should create a valid uuid when it is not passed in the constructor", () => {
    const vo = new UniqueEntityId();

    expect(uuidValidate(vo.value)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  });
});
