import { NotFoundError } from "../../../@seedwork/errors/not-found.error";
import { Entity } from "../entity/entity";
import UniqueEntityId from "../value-objects/unique-entity-id.vo";
import { RepositoryInterface } from "./repository-contract";

export default abstract class InMemoryRepository<E extends Entity> implements RepositoryInterface<E> {
  items: E[] = [];

  async insert(entity: E): Promise<void> {
    this.items.push(entity);
  }

  async findById(id: string | UniqueEntityId): Promise<E> {
    const _id = `${id}`;
    return this._get(_id);
  }

  async findAll(): Promise<E[]> {
    return this.items;
  }

  async update(entity: E): Promise<void> {
    await this._get(entity.id);

    const index = this.items.findIndex(item => item.id);

    this.items[index] = entity;
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    const _id = `${id}`;

    await this._get(_id);

    this.items = this.items.filter(item => item.id !== _id);
  }

  protected async _get(id: string): Promise<E> {
    const entity = this.items.find(item => item.id === id);

    if (!entity) {
      throw new NotFoundError("Entity not found");
    }

    return entity;
  }
}
