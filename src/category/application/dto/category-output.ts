import { Category } from "category/domain/entities/category";

export type CategoryOutput = {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: Date;
};

export class CategoryOutputMapper {
  static toOutput(category: Category) {
    return category.toJSON();
  }
}
