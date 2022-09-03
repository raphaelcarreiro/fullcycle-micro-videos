import { UseCase } from "../../../@seedwork/application/use-case";
import CategoryRepository from "category/domain/repository/category.repository.interface";
import { CategoryOutput, CategoryOutputMapper } from "../dto/category-output";

export default class GetCategoryUseCase implements UseCase<Input, Output> {
  constructor(private readonly repository: CategoryRepository.RepositoryInterface) {}

  async execute(input: Input): Promise<Output> {
    const entity = await this.repository.findById(input.id);

    return CategoryOutputMapper.toOutput(entity);
  }
}

export type Input = {
  id: string;
};

export type Output = CategoryOutput;
