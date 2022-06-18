import { Entity } from "../entity/entity";
import UniqueEntityId from "../value-objects/unique-entity-id.vo";

export interface RepositoryInterface<E extends Entity> {
  insert(entity: E): Promise<void>;
  findById(id: string | UniqueEntityId): Promise<E>;
  findAll(): Promise<E[]>;
  update(entity: E): Promise<void>;
  delete(id: string | UniqueEntityId): Promise<void>;
}

export type SortDirection = "asc" | "desc";

export type SearchProps<Filter = string> = {
  page?: number;
  per_page?: number;
  sort?: string;
  sort_direction?: SortDirection;
  filter?: Filter;
};

export class SearchParams {
  protected _page: number;
  protected _per_page: number = 15;
  protected _sort: string | null = null;
  protected _sort_direction: SortDirection | null = null;
  protected _filter: string | null = null;

  constructor(props: SearchProps) {
    this.page = props.page ?? 1;
    this.per_page = props.per_page ?? 15;
    this.sort = props.sort ?? null;
    this.sort_direction = props.sort_direction ?? null;
    this.filter = props.filter ?? null;
  }

  get page(): number {
    return this._page;
  }

  private set page(value: number) {
    this._page = value;
  }

  get per_page(): number {
    return this._per_page;
  }

  private set per_page(value: number) {
    this._per_page = value;
  }

  get sort(): string | null {
    return this._sort;
  }

  private set sort(value: string | null) {
    this._sort = value;
  }

  get sort_direction(): SortDirection | null {
    return this._sort_direction;
  }

  private set sort_direction(value: SortDirection | null) {
    this._sort_direction = value;
  }

  get filter(): string | null {
    return this._filter;
  }

  private set filter(value: string | null) {
    this._filter = value;
  }
}

export interface SearchableRepositoryInterface<E extends Entity, Input, Output> extends RepositoryInterface<E> {
  search(props: Input): Promise<Output>;
}
