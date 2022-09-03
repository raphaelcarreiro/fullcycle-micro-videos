import { Category } from "../../../../category/domain/entities/category";
import { NotFoundError } from "../../../../@seedwork/errors/not-found.error";
import { CategoryInMemoryRepository } from "../../../infra/repository/category-in-memory.repository";
import GetCategoryUseCase from "../get-category.use-case";

describe("GetCategoryUseCase unit tests", () => {
  let useCase: GetCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new GetCategoryUseCase(repository);
  });

  it("should throws an error when category was not found", async () => {
    await expect(() =>
      useCase.execute({
        id: "FAKE_ID",
      })
    ).rejects.toThrow(NotFoundError);
  });

  it("should get a category", async () => {
    const category = new Category({ name: "Movie" });

    repository.items = [category];

    const findByIdSpy = jest.spyOn(repository, "findById");

    const output = await useCase.execute({ id: category.id });

    expect(findByIdSpy).toBeCalled();
    expect(output).toStrictEqual({
      id: category.id,
      name: category.name,
      description: category.description,
      is_active: category.is_active,
      created_at: category.created_at,
    });
  });
});
