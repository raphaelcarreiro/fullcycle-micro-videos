import { SortDirection } from "@core/seedwork/domain/repository/repository-contracts";
import { Category } from "category/domain/entities/category";
import { CategoryRepository } from "category/domain/repository/category.repository.interface";
import { InMemorySearchableRepository } from "../../../@seedwork/domain/repository/in-memory.repository";

export class CategoryInMemoryRepository
  extends InMemorySearchableRepository<Category>
  implements CategoryRepository.RepositoryInterface
{
  sortableFields: string[] = ["created_at", "name"];

  protected async applyFilter(items: Category[], filter?: CategoryRepository.Filter | null): Promise<Category[]> {
    if (!filter) {
      return items;
    }

    return items.filter(item => item.props.name.toLowerCase().includes(filter.toLowerCase()));
  }

  protected async applySort(
    items: Category[],
    sort?: string | null,
    sort_direction?: SortDirection | null
  ): Promise<Category[]> {
    if (!sort) {
      return super.applySort(items, "created_at", sort_direction ?? "desc");
    }

    return super.applySort(items, sort, sort_direction ?? "desc");
  }
}
