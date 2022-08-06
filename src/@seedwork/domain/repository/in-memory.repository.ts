import { NotFoundError } from "../../../@seedwork/errors/not-found.error";
import { Entity } from "../entity/entity";
import UniqueEntityId from "../value-objects/unique-entity-id.vo";
import {
  RepositoryInterface,
  SearchableRepositoryInterface,
  SearchParams,
  SearchResult,
  SortDirection,
} from "./repository-contracts";

export abstract class InMemoryRepository<E extends Entity> implements RepositoryInterface<E> {
  items: E[] = [];

  async insert(entity: E): Promise<void> {
    this.items.push(entity);
  }

  async findById(id: string | UniqueEntityId): Promise<E> {
    const _id = `${id}`;
    return this._get(_id);
  }

  async findAll(): Promise<E[]> {
    return this.items;
  }

  async update(entity: E): Promise<void> {
    await this._get(entity.id);

    const index = this.items.findIndex(item => item.id);

    this.items[index] = entity;
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    const _id = `${id}`;

    await this._get(_id);

    this.items = this.items.filter(item => item.id !== _id);
  }

  protected async _get(id: string): Promise<E> {
    const entity = this.items.find(item => item.id === id);

    if (!entity) {
      throw new NotFoundError("Entity not found");
    }

    return entity;
  }
}

export abstract class InMemorySearchableRepository<E extends Entity>
  extends InMemoryRepository<E>
  implements SearchableRepositoryInterface<E>
{
  sortableFields: string[] = [];

  async search(props: SearchParams): Promise<SearchResult<E>> {
    const filtered = await this.applyFilter(this.items, props.filter);
    const sorted = await this.applySort(filtered, props.sort, props.sort_direction);
    const paginated = await this.applyPaginate(sorted, props.page, props.per_page);

    return new SearchResult({
      items: paginated,
      total: filtered.length,
      current_page: props.page || 1,
      per_page: props.per_page,
      sort: props.sort,
      sort_direction: props.sort_direction,
      filter: props.filter,
    });
  }

  protected abstract applyFilter(items: E[], filter?: string | null): Promise<E[]>;

  protected async applySort(items: E[], sort: string | null, sort_direction: SortDirection | null): Promise<E[]> {
    if (!sort) {
      return items;
    }

    if (!this.sortableFields.includes(sort)) {
      return items;
    }

    return [...items].sort((a, b) => {
      if (a.props[sort] < b.props[sort]) {
        return sort_direction === "asc" ? -1 : 1;
      }

      if (a.props[sort] > b.props[sort]) {
        return sort_direction === "asc" ? 1 : -1;
      }

      return 0;
    });
  }

  protected async applyPaginate(
    items: E[],
    page: SearchParams["page"],
    per_page: SearchParams["per_page"]
  ): Promise<E[]> {
    if (!page) {
      page = 1;
    }

    const start = (page - 1) * per_page;

    const limit = start + per_page;

    return items.slice(+start, limit);
  }
}
