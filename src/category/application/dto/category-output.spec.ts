import UniqueEntityId from "../../../@seedwork/domain/value-objects/unique-entity-id.vo";
import { Category } from "../../../category/domain/entities/category";
import { CategoryOutputMapper } from "./category-output";

describe("CategoryOutputMapper tests", () => {
  it("should convert a category to a output json", () => {
    const created_at = new Date();

    const category = new Category(
      { name: "Movie", created_at },
      new UniqueEntityId("7e3cda8f-53e2-4014-a0fd-b5657d6ecb78")
    );

    const output = CategoryOutputMapper.toOutput(category);

    const spyToJson = jest.spyOn(category, "toJSON");

    expect(spyToJson).toBeCalled();
    expect(output).toStrictEqual({
      name: "Movie",
      created_at,
      id: "7e3cda8f-53e2-4014-a0fd-b5657d6ecb78",
      is_active: true,
      description: null,
    });
  });
});
