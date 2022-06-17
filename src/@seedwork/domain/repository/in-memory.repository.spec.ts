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
});
