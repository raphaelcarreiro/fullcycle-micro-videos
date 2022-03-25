import { Category } from "./category";
import { omit } from "lodash";

describe("Category test", () => {
  test("constructor", () => {
    let category = new Category({
      name: "Movie",
    });

    let props = omit(category.props, "created_at");

    expect(category.props).toMatchObject(props);
    expect(category.props.created_at).toBeInstanceOf(Date);

    let created_at = new Date();

    category = new Category({
      name: "Movie",
      description: "some description",
      is_active: false,
      created_at,
    });

    expect(category).toStrictEqual(category);
  });
});
