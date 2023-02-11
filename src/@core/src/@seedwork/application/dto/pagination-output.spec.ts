import UniqueEntityId from "../../domain/value-objects/unique-entity-id.vo";
import { Category } from "../../../category/domain/entities/category";
import { PaginationOutputMapper } from "./pagination-output";
import { SearchResult } from "../../../@seedwork/domain/repository/repository-contracts";

describe("PaginationOutput tests", () => {
  it("should convert a SearchResult in output", () => {
    const created_at = new Date();

    const category = new Category(
      { name: "Movie", created_at },
      new UniqueEntityId("7e3cda8f-53e2-4014-a0fd-b5657d6ecb78")
    );

    const searchResult = new SearchResult({
      items: [category],
      current_page: 1,
      filter: null,
      per_page: 1,
      sort: null,
      sort_direction: null,
      total: 1,
    });

    const output = PaginationOutputMapper.toOutput(searchResult);

    expect(output).toStrictEqual({
      total: 1,
      current_page: 1,
      last_page: 1,
      per_page: 1,
    });
  });
});
