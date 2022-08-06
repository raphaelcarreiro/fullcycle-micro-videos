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

export class SearchParams<Filter = string> {
  protected _page: number | null;
  protected _per_page: number = 15;
  protected _sort: string | null = null;
  protected _sort_direction: SortDirection | null = null;
  protected _filter: Filter | null = null;

  constructor(props?: SearchProps<Filter>) {
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

  get filter(): Filter | null {
    return this._filter;
  }

  private set filter(value: Filter | null | undefined) {
    this._filter = value ? value : null;
  }
}

type SearchResultProps<E extends Entity, Filter> = {
  items: E[];
  total: number;
  current_page: number;
  per_page: number;
  sort: string | null;
  sort_direction: string | null;
  filter: string | null;
};
export class SearchResult<E extends Entity, Filter = string> {
  readonly items: E[];
  readonly total: number;
  readonly current_page: number;
  readonly per_page: number;
  readonly last_page: number;
  readonly sort: string | null;
  readonly sort_direction: string | null;
  readonly filter: string | null;

  constructor(props: SearchResultProps<E, Filter>) {
    this.items = props.items;
    this.total = props.total;
    this.current_page = props.current_page;
    this.per_page = props.per_page;
    this.last_page = Math.ceil(props.total / props.per_page);
    this.sort = props.sort;
    this.sort_direction = props.sort_direction;
    this.filter = props.filter;
  }

  toJSON() {
    return {
      items: this.items,
      total: this.total,
      current_page: this.current_page,
      per_page: this.per_page,
      last_page: this.last_page,
      sort: this.sort,
      sort_direction: this.sort_direction,
      filter: this.filter,
    };
  }
}

export interface SearchableRepositoryInterface<
  E extends Entity,
  Filter = string,
  Input = SearchParams,
  Output = SearchResult<E, Filter>
> extends RepositoryInterface<E> {
  sortableFields: string[];
  search(props: Input): Promise<Output>;
}
