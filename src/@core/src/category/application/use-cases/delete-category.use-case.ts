import { UseCase as DefaultUseCase } from "../../../@seedwork/application/use-case";
import { CategoryRepository } from "category/domain/repository/category.repository.interface";

export namespace DeleteCategoryUseCase {
  export class UseCase implements DefaultUseCase<Input, void> {
    constructor(private readonly repository: CategoryRepository.RepositoryInterface) {}

    async execute(input: Input): Promise<void> {
      await this.repository.delete(input.id);
    }
  }

  export type Input = {
    id: string;
  };
}

export default DeleteCategoryUseCase;
