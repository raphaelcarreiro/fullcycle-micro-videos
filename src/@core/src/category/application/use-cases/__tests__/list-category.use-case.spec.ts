import { CategoryRepository } from "../../../../category/domain/repository/category.repository.interface";
import { Category } from "../../../../category/domain/entities/category";
import { CategoryInMemoryRepository } from "../../../infra/repository/category-in-memory.repository";
import ListCategoriesUseCase from "../list-categories.use-case";

describe("ListCategoriesUseCase unit tests", () => {
  let useCase: ListCategoriesUseCase.UseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new ListCategoriesUseCase.UseCase(repository);
  });

  test("toOutput method", () => {
    const result = new CategoryRepository.SearchResult({
      items: [],
      total: 1,
      current_page: 1,
      per_page: 1,
      sort: null,
      sort_direction: null,
      filter: null,
    });

    const output = useCase["toOutput"](result);

    expect(output).toStrictEqual({
      total: 1,
      items: [],
      current_page: 1,
      per_page: 1,
      last_page: 1,
    });
  });

  it("should return output using empty input with categories ordered by created at", async () => {
    const categories = [
      new Category({ name: "Test 1" }),
      new Category({ name: "Test 2", created_at: new Date(Date.now() + 100) }),
    ];

    repository.items = categories;

    const output = await useCase.execute({});

    expect(output).toStrictEqual({
      total: 2,
      items: categories.reverse().map(category => category.toJSON()),
      current_page: 1,
      per_page: 15,
      last_page: 1,
    });
  });

  it("should returns output using pagination, sort and filter", async () => {
    const categories = [
      new Category({ name: "a" }),
      new Category({ name: "AAA" }),
      new Category({ name: "AaA" }),
      new Category({ name: "b" }),
      new Category({ name: "c" }),
    ];

    repository.items = categories;

    let output = await useCase.execute({ page: 1, per_page: 2, sort: "name", filter: "a" });
    expect(output).toStrictEqual({
      total: 3,
      items: [categories[1].toJSON(), categories[2].toJSON()],
      current_page: 1,
      per_page: 2,
      last_page: 2,
    });

    output = await useCase.execute({ page: 2, per_page: 2, sort: "name", filter: "a" });
    expect(output).toStrictEqual({
      total: 3,
      items: [categories[0].toJSON()],
      current_page: 2,
      per_page: 2,
      last_page: 2,
    });

    output = await useCase.execute({ page: 1, per_page: 2, sort: "name", filter: "a", sort_direction: "desc" });
    expect(output).toStrictEqual({
      total: 3,
      items: [categories[0].toJSON(), categories[2].toJSON()],
      current_page: 1,
      per_page: 2,
      last_page: 2,
    });
  });
});
