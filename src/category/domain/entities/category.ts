import { Entity } from "../../../@seedwork/domain/entity/entity";
import UniqueEntityId from "../../../@seedwork/domain/value-objects/unique-entity-id.vo";

export type CategoryProperties = {
  name: string;
  description?: string | null;
  is_active?: boolean;
  created_at?: Date;
};
export class Category extends Entity<CategoryProperties> {
  constructor(public readonly props: CategoryProperties, id?: UniqueEntityId) {
    super(props, id);

    this.description = props.description;
    this.is_active = props.is_active;
    this.created_at = props.created_at;
  }

  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  private set description(value: string | undefined | null) {
    this.props.description = value || null;
  }

  get is_active() {
    return this.props.is_active;
  }

  private set is_active(value: boolean | undefined) {
    this.props.is_active = value ?? true;
  }

  get created_at() {
    return this.props.created_at;
  }

  private set created_at(value: Date | undefined) {
    this.props.created_at = value || new Date();
  }

  update(payload: Pick<CategoryProperties, "name" | "description">) {
    this.props.description = payload.description;
    this.props.name = payload.name;
  }

  toggleIsActive() {
    this.props.is_active = !this.props.is_active;
  }
}
