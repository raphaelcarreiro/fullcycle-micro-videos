import { Category } from "../../../domain/entities/category";
import { NotFoundError } from "../../../../@seedwork/errors/not-found.error";
import { CategoryInMemoryRepository } from "../../../infra/repository/category-in-memory.repository";
import GetCategoryUseCase from "../get-category.use-case";
import DeleteCategoryUseCase from "../delete-category.use-case";

describe("DeleteCategoryUseCase unit tests", () => {
  let useCase: DeleteCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new DeleteCategoryUseCase(repository);
  });

  it("should throws an error when category was not found", async () => {
    await expect(() =>
      useCase.execute({
        id: "FAKE_ID",
      })
    ).rejects.toThrow(NotFoundError);
  });

  it("should delete a category", async () => {
    const category = new Category({ name: "Movie" });

    repository.items = [category];

    const deleteSpy = jest.spyOn(repository, "delete");

    await useCase.execute({ id: category.id });

    expect(deleteSpy).toBeCalled();
  });
});
