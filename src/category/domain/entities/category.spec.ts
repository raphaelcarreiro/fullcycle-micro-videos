import { Category } from "./category";

describe("Category test", () => {
  test("constructor", () => {
    const category = new Category("Movie");

    expect(category.name).toBe("Movie");
  });
});
