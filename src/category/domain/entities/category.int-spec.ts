import { ValidationError } from "../../../@seedwork/errors/validation-error";
import { Category } from "./category";

describe("Category integration tests", () => {
  it("should not be able to create new category when name property does not follow the rules", () => {
    expect(() => new Category({ name: "" })).toThrow(
      new ValidationError("name is required")
    );

    expect(() => new Category({ name: "t".repeat(256) })).toThrow(
      new ValidationError("name must be less or equal then 255 characters")
    );

    expect(() => new Category({ name: 5 as any })).toThrow(
      new ValidationError("name must be a string")
    );
  });

  it("should not be able to create new category when description property does not follow the rules", () => {
    expect(
      () => new Category({ name: "Movie", description: 5 as any } as any)
    ).toThrow(new ValidationError("description must be a string"));
  });

  it("should not be able to create new category when is_active property does not follow the rules", () => {
    expect(
      () => new Category({ name: "Movie", is_active: "active" as any } as any)
    ).toThrow(new ValidationError("description must be a string"));
  });
});
