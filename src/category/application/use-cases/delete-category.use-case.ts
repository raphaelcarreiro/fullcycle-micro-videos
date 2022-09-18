import { UseCase } from "../../../@seedwork/application/use-case";
import { CategoryRepository } from "category/domain/repository/category.repository.interface";

export default class DeleteCategoryUseCase implements UseCase<Input, void> {
  constructor(private readonly repository: CategoryRepository.RepositoryInterface) {}

  async execute(input: Input): Promise<void> {
    await this.repository.delete(input.id);
  }
}

export type Input = {
  id: string;
};
