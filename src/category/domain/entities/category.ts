export type CategoryProperties = {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
};
export class Category {
  constructor(public readonly props: CategoryProperties) {
    this.description = props.description;
    this.is_active = props.is_active || true;
    this.created_at = props.created_at || new Date();
  }

  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  private set description(value: string | undefined) {
    this.props.description = value;
  }

  get isActive() {
    return this.props.is_active;
  }

  private set is_active(value: boolean | undefined) {
    this.props.is_active = value;
  }

  get created_at() {
    return this.props.created_at;
  }

  private set created_at(value: Date | undefined) {
    this.props.created_at = value || new Date();
  }
}
