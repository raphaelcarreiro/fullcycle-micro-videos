import { UseCase } from "../../../@seedwork/application/use-case";
import { CategoryRepository } from "../../../category/domain/repository/category.repository.interface";
import { CategoryOutput, CategoryOutputMapper } from "../dto/category-output";
import { SearchInputDto } from "../../../@seedwork/application/dto/search-input";
import { PaginationOutputDto, PaginationOutputMapper } from "../../../@seedwork/application/dto/pagination-output";

export default class ListCategoriesUseCase implements UseCase<Input, Output> {
  constructor(private readonly repository: CategoryRepository.RepositoryInterface) {}

  async execute(input: Input): Promise<Output> {
    const params = new CategoryRepository.SearchParams(input);

    const searchResult = await this.repository.search(params);

    return this.toOutput(searchResult);
  }

  private toOutput(searchResult: CategoryRepository.SearchResult): Output {
    return {
      ...PaginationOutputMapper.toOutput(searchResult),
      items: searchResult.items.map(category => CategoryOutputMapper.toOutput(category)),
    };
  }
}

export type Input = SearchInputDto;

export type Output = PaginationOutputDto<CategoryOutput>;
