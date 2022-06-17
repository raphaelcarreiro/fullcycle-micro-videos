import { NotFoundError } from "../../../@seedwork/errors/not-found.error";
import { Entity } from "../entity/entity";
import UniqueEntityId from "../value-objects/unique-entity-id.vo";
import InMemoryRepository from "./in-memory.repository";

class StubEntityProps {
  name: string;
  price: number;
}

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe("InMemoryRepository Unit Test", () => {
  let repository: StubInMemoryRepository;

  beforeEach(() => {
    repository = new StubInMemoryRepository();
  });

  it("should insert a new entity", async () => {
    const entity = new StubEntity({ name: "name value", price: 5 });
    await repository.insert(entity);

    expect(entity.toJSON()).toStrictEqual(repository.items[0].toJSON());
  });

  it("should throws error when entity not found", async () => {
    expect(repository.findById("FAKE_ID")).rejects.toThrow(NotFoundError);

    expect(repository.findById(new UniqueEntityId("4084eb0a-22ae-48e8-8b06-75e52dd020df"))).rejects.toThrow(
      NotFoundError
    );
  });

  it("should finds a entity by id", async () => {
    const entity = new StubEntity({ name: "name value", price: 5 });
    await repository.insert(entity);

    let found = await repository.findById(entity.id);
    expect(found.toJSON()).toStrictEqual(entity.toJSON());

    found = await repository.findById(entity.uniqueEntityId);
    expect(found).toStrictEqual(entity);
  });

  it("should returns all entities", async () => {
    const entity = new StubEntity({ name: "name value", price: 5 });
    await repository.insert(entity);

    const entities = await repository.findAll();

    expect(entities).toStrictEqual([entity]);
  });

  it("should throws error on update when entity not found", async () => {
    const entity = new StubEntity({ name: "name value", price: 5 });
    expect(repository.update(entity)).rejects.toThrow(NotFoundError);
  });

  it("should throws error on delete when entity not found", async () => {
    expect(repository.delete("FAKE_ID")).rejects.toThrow(NotFoundError);
    expect(repository.delete(new UniqueEntityId("4084eb0a-22ae-48e8-8b06-75e52dd020df"))).rejects.toThrow(
      NotFoundError
    );
  });

  it("should be possible update an entity", async () => {
    const entity = new StubEntity({ name: "name value", price: 5 });
    await repository.insert(entity);

    const updatedEntity = new StubEntity({ name: "new name", price: 6 }, entity.uniqueEntityId);

    await repository.update(updatedEntity);

    expect(updatedEntity).toStrictEqual(repository.items[0]);
  });

  it("should delete an entity", async () => {
    let entity = new StubEntity({ name: "name value", price: 5 });
    await repository.insert(entity);
    await repository.delete(entity.id);
    expect(repository.items).toHaveLength(0);

    entity = new StubEntity({ name: "name value", price: 5 });
    await repository.insert(entity);
    await repository.delete(entity.uniqueEntityId);
    expect(repository.items).toHaveLength(0);
  });
});
