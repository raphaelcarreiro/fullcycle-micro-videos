import {
  SearchableRepositoryInterface,
  SearchParams as DefaultSearchParams,
  SearchResult as DefaulSearchResult,
} from "../../../@seedwork/domain/repository/repository-contracts";
import { Category } from "../entities";

export namespace CategoryRepository {
  export type Filter = string;

  export class SearchParams extends DefaultSearchParams<Filter> {}

  export class SearchResult extends DefaulSearchResult<Category, Filter> {}

  export interface RepositoryInterface
    extends SearchableRepositoryInterface<Category, Filter, SearchParams, SearchResult> {}
}
