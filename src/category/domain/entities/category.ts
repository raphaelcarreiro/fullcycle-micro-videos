import { v4 as uuid } from "uuid";

export type CategoryProperties = {
  name: string;
  description?: string | null;
  is_active?: boolean;
  created_at?: Date;
};
export class Category {
  public readonly id: string;

  constructor(public readonly props: CategoryProperties, id?: string) {
    this.id = id || uuid();

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
}
