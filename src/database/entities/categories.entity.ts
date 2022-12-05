import { Column, Entity } from 'typeorm';
import { DatabaseEntity } from './database-entity';

export const categoryTableName = 'categories';

@Entity({ name: categoryTableName })
export class Category extends DatabaseEntity {
  @Column({ nullable: false })
  name: string;

  public constructor(id: string, name: string) {
    super();
    this.id = id;
    this.name = name;
  }
}
