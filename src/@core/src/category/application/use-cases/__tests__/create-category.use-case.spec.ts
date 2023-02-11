import { CategoryInMemoryRepository } from "../../../../category/infra/repository/category-in-memory.repository";
import CreateCategoryUseCase from "../create-category.use-case";

describe("CreateCategoryUseCase unit tests", () => {
  let useCase: CreateCategoryUseCase.UseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new CreateCategoryUseCase.UseCase(repository);
  });

  it("should create a category", async () => {
    let output = await useCase.execute({
      name: "Movie",
    });

    expect(output).toStrictEqual({
      name: "Movie",
      description: null,
      is_active: true,
      id: repository.items[0].id,
      created_at: repository.items[0].created_at,
    });

    output = await useCase.execute({
      name: "Serie",
      description: "Some description",
      is_active: false,
    });

    expect(output).toStrictEqual({
      name: "Serie",
      description: "Some description",
      is_active: false,
      id: repository.items[1].id,
      created_at: repository.items[1].created_at,
    });
  });
});
