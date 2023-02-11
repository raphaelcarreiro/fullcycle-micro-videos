import { validate as uuidValidate } from "uuid";
import UniqueEntityId from "../value-objects/unique-entity-id.vo";
import { Entity } from "./entity";

class StubEntity extends Entity<{ prop1: string; prop2: number }> {}
describe("Entity unit tests", () => {
  it("Should set props and id", () => {
    const arrange = {
      prop1: "value1",
      prop2: 10,
    };

    const entity = new StubEntity(arrange);
    expect(entity.props).toStrictEqual(arrange);
    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(entity.id).not.toBe(null);
    expect(uuidValidate(entity.id)).toBeTruthy();
  });

  it("should accept a valid uuid", () => {
    const arrange = {
      prop1: "value1",
      prop2: 10,
    };

    const uniqueEntityId = new UniqueEntityId();

    const entity = new StubEntity(arrange, uniqueEntityId);

    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(entity.id).toBe(uniqueEntityId.value);
  });

  it("Should convert a entity to a Javascript object", () => {
    const arrange = {
      prop1: "value1",
      prop2: 10,
    };

    const uniqueEntityId = new UniqueEntityId();

    const entity = new StubEntity(arrange, uniqueEntityId);

    expect(entity.toJSON()).toStrictEqual({
      id: uniqueEntityId.value,
      ...arrange,
    });
  });
});
