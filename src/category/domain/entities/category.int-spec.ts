import { Category } from "./category";

describe("Category integration tests", () => {
  describe("create method", () => {
    it("should not be able to create new category when name property does not follow the rules", () => {
      expect(() => new Category({ name: "" })).containsErrorMessages({
        name: ["name should not be empty"],
      });

      expect(() => new Category({ name: "t".repeat(256) })).containsErrorMessages({
        name: ["name must be shorter than or equal to 255 characters"],
      });

      expect(() => new Category({ name: 5 as any })).containsErrorMessages({
        name: ["name must be a string", "name must be shorter than or equal to 255 characters"],
      });
    });

    it("should not be able to create new category when description property does not follow the rules", () => {
      expect(() => new Category({ name: "Movie", description: 5 as any })).containsErrorMessages({
        description: ["description must be a string"],
      });
    });

    it("should not be able to create new category when is_active property does not follow the rules", () => {
      expect(() => new Category({ name: "Movie", is_active: "active" as any })).containsErrorMessages({
        is_active: ["is_active must be a boolean value"],
      });
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

      expect(() => new Category({ name: 5 as any })).containsErrorMessages({
        name: ["name must be a string", "name must be shorter than or equal to 255 characters"],
      });

      expect(() => category.update({ name: "" })).containsErrorMessages({
        name: ["name should not be empty"],
      });

      expect(() => new Category({ name: "t".repeat(256) })).containsErrorMessages({
        name: ["name must be shorter than or equal to 255 characters"],
      });
    });

    it("should not be able to create new category when description property does not follow the rules", () => {
      expect(() => new Category({ name: "Movie", description: 5 as any })).containsErrorMessages({
        description: ["description must be a string"],
      });
    });

    it("should a valid category", () => {
      expect.assertions(0);

      const category = new Category({ name: "Movie" });

      category.update({ name: "Series", description: null });
      category.update({ name: "Series", description: "Some description" });
    });
  });
});
