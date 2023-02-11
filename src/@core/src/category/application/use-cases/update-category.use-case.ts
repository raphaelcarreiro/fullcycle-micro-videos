import { Category } from "../../domain/entities/category";
import { CategoryRepository } from "category/domain/repository/category.repository.interface";
import { CategoryOutput, CategoryOutputMapper } from "../dto/category-output";
import { UseCase as DefaultUseCase } from "#seedwork/application/use-case";

export namespace UpdateCategoryUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private readonly repository: CategoryRepository.RepositoryInterface) {}

    async execute(input: Input): Promise<Output> {
      const category = await this.repository.findById(input.id);

      if (input.is_active !== undefined) {
        category.toggleIsActive();
      }

      category.update(input);

      await this.repository.update(category);

      return CategoryOutputMapper.toOutput(category);
    }
  }

  export type Input = {
    id: string;
    name: string;
    description?: string;
    is_active?: boolean;
  };

  export type Output = CategoryOutput;
}

export default UpdateCategoryUseCase;
