import { Category } from "../../../category/domain/entities/category";
import { CategoryInMemoryRepository } from "./category-in-memory.repository";

describe("CategoryInMemoryRepository tests", () => {
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
  });

  const movie = new Category({ name: "Movies", created_at: new Date(2022, 8, 5) });
  const serie = new Category({ name: "Series", created_at: new Date(2022, 8, 3) });
  const manga = new Category({ name: "Mangas", created_at: new Date(2022, 8, 6) });

  const categories = [movie, serie, manga];

  it("should apply filter", async () => {
    const filtered = await repository["applyFilter"](categories, "series");
    expect(filtered).toStrictEqual([serie]);
  });

  it("should apply sort with created_at as default", async () => {
    const sorted = await repository["applySort"](categories);
    expect(sorted).toStrictEqual([manga, movie, serie]);
  });

  it("should apply sort", async () => {
    let sorted = await repository["applySort"](categories, "name", "asc");
    expect(sorted).toStrictEqual([manga, movie, serie]);

    sorted = await repository["applySort"](categories, "name", "desc");
    expect(sorted).toStrictEqual([serie, movie, manga]);
  });
});
