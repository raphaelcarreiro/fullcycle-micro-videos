import { Category } from "../../../category/domain/entities/category";
import { CategoryRepository } from "category/domain/repository/category.repository.interface";
import { CategoryOutput, CategoryOutputMapper } from "../dto/category-output";
import { UseCase } from "@seedwork/application/use-case";

export default class CreateCategoryUseCase implements UseCase<Input, Output> {
  constructor(private readonly repository: CategoryRepository.RepositoryInterface) {}

  async execute(input: Input): Promise<Output> {
    const entity = new Category(input);

    this.repository.insert(entity);

    return CategoryOutputMapper.toOutput(entity);
  }
}

export type Input = {
  name: string;
  description?: string;
  is_active?: boolean;
};

export type Output = CategoryOutput;
