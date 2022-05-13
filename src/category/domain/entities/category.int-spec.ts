import { ValidationError } from "../../../@seedwork/errors/validation-error";
import { Category } from "./category";

describe("Category integration tests", () => {
  describe("create method", () => {
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
        () => new Category({ name: "Movie", description: 5 as any })
      ).toThrow(new ValidationError("description must be a string"));
    });

    it("should not be able to create new category when is_active property does not follow the rules", () => {
      expect(
        () => new Category({ name: "Movie", is_active: "active" as any })
      ).toThrow(new ValidationError("is_active must be a boolean"));
    });

    it("should a valid category", () => {
      expect.assertions(0);

      new Category({ name: "Movie" });
      new Category({ name: "Movie", description: "Some description" });
      new Category({ name: "Movie", description: null as any });
      new Category({
        name: "Movie",
        description: "Some description",
        is_active: false,
      });
      new Category({
        name: "Movie",
        description: "Some description",
        is_active: true,
      });
    });
  });

  describe("update method", () => {
    it("should not be able to create new category when name property does not follow the rules", () => {
      let category = new Category({ name: "Movie" });

      expect(() => category.update({ name: "" })).toThrow(
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
      const category = new Category({
        name: "Movie",
        description: "Some description",
      });
      expect(
        () => new Category({ name: "Movie", description: 5 as any })
      ).toThrow(new ValidationError("description must be a string"));
    });

    it("should a valid category", () => {
      expect.assertions(0);

      const category = new Category({ name: "Movie" });

      category.update({ name: "Series", description: null });
      category.update({ name: "Series", description: "Some description" });
    });
  });
});
