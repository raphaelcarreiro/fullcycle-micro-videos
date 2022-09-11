import { NotFoundError } from "../../../../@seedwork/errors/not-found.error";
import UniqueEntityId from "../../../../@seedwork/domain/value-objects/unique-entity-id.vo";
import { Category } from "../../../../category/domain/entities/category";
import { CategoryInMemoryRepository } from "../../../infra/repository/category-in-memory.repository";
import UpdateCategoryUseCase from "../update-category.use-case";

describe("UpdateCategoryUseCase unit tests", () => {
  let useCase: UpdateCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new UpdateCategoryUseCase(repository);
  });

  it("should update a category", async () => {
    const category = new Category({ name: "Movie" }, new UniqueEntityId("5d91e43a-cdcc-43df-afb0-31563fa00751"));

    repository.items = [category];

    const findByIdSpy = jest.spyOn(repository, "findById");
    const updateSpy = jest.spyOn(repository, "update");
    const output = await useCase.execute({ id: category.id, name: "Series" });

    expect(output.name).toBe("Series");
    expect(findByIdSpy).toBeCalled();
    expect(updateSpy).toBeCalled();
  });

  it("should update prop is_active of a category", async () => {
    const category = new Category({ name: "Movie" }, new UniqueEntityId("5d91e43a-cdcc-43df-afb0-31563fa00751"));

    repository.items = [category];

    const findByIdSpy = jest.spyOn(repository, "findById");

    const output = await useCase.execute({
      id: category.id,
      name: "Movie",
      is_active: false,
    });

    expect(output.is_active).toBeFalsy();
    expect(findByIdSpy).toBeCalled();
  });

  it("should throw an exception when a category was not found", async () => {
    repository.items = [new Category({ name: "Movie" })];

    const findByIdSpy = jest.spyOn(repository, "findById");
    const updateSpy = jest.spyOn(repository, "update");

    expect(() => useCase.execute({ id: "FAKE_ID", name: "Series" })).rejects.toThrow(NotFoundError);
    expect(findByIdSpy).toBeCalled();
    expect(updateSpy).not.toBeCalled();
  });
});
