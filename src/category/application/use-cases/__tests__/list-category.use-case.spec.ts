import { SearchResult } from "../../../../@seedwork/domain/repository/repository-contracts";
import { CategoryInMemoryRepository } from "../../../infra/repository/category-in-memory.repository";
import ListCategoriesUseCase from "../list-categories.use-case";

describe("ListCategoriesUseCase unit tests", () => {
  let useCase: ListCategoriesUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new ListCategoriesUseCase(repository);
  });

  test("toOutput method", () => {
    const result = new SearchResult({
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
});
