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
  page?: number | null;
  per_page?: number;
  sort?: string;
  sort_direction?: SortDirection;
  filter?: Filter;
};

export class SearchParams {
  protected _page: number | null;
  protected _per_page: number = 15;
  protected _sort: string | null = null;
  protected _sort_direction: SortDirection | null = null;
  protected _filter: string | null = null;

  constructor(props?: SearchProps) {
    this.page = props?.page;
    this.per_page = props?.per_page;
    this.sort = props?.sort;
    this.sort_direction = props?.sort_direction;
    this.filter = props?.filter;
  }

  get page(): number | null {
    return this._page;
  }

  private set page(value: number | undefined | null) {
    let _page = parseInt(`${value}`);

    if (!Number.isInteger(_page) || _page <= 0) {
      _page = 1;
    }

    this._page = _page;
  }

  get per_page(): number {
    return this._per_page;
  }

  private set per_page(value: number | undefined) {
    let _value = parseInt(`${value}`);

    if (!Number.isInteger(_value) || _value <= 0) {
      _value = 15;
    }

    this._per_page = _value;
  }

  get sort(): string | null {
    return this._sort;
  }

  private set sort(value: string | null | undefined) {
    this._sort = value ? `${value}` : null;
  }

  get sort_direction(): SortDirection | null {
    return this._sort_direction;
  }

  private set sort_direction(value: SortDirection | null | undefined) {
    if (!this.sort) {
      this._sort_direction = null;
      return;
    }

    value = `${value}`.toLowerCase() as SortDirection;

    this._sort_direction = value !== "asc" && value !== "desc" ? "asc" : value;
  }

  get filter(): string | null {
    return this._filter;
  }

  private set filter(value: string | null | undefined) {
    this._filter = value ? `${value}` : null;
  }
}

export interface SearchableRepositoryInterface<E extends Entity, Input, Output> extends RepositoryInterface<E> {
  search(props: Input): Promise<Output>;
}
