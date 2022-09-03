import { SortDirection } from "@seedwork/domain/repository/repository-contracts";

export type SearchInputDto<Filter = string> = {
  page?: number | null;
  per_page?: number;
  sort?: string;
  sort_direction?: SortDirection;
  filter?: Filter;
};
