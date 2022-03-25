import { Category } from "./category";

describe("Category test", () => {
  test("constructor", () => {
    const createdAt = new Date();

    const category = new Category({
      name: "Movie",
      description: "description",
      is_active: true,
      created_at: new Date(),
    });

    expect(category.props.name).toBe("Movie");
    expect(category.props.description).toBe("description");
    expect(category.props.is_active).toBe(true);
    expect(category.props.created_at).toStrictEqual(createdAt);
  });
});
