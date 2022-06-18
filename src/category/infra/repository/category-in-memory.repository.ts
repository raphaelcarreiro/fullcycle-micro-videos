import { SearchableRepositoryInterface } from "@seedwork/domain/repository/repository-contract";
import { Category } from "category/domain/entities/category";
import { InMemorySearchableRepository } from "../../../@seedwork/domain/repository/in-memory.repository";

class CategoryInMemoryRepository
  extends InMemorySearchableRepository<Category>
  implements SearchableRepositoryInterface<Category, any, any> {}
