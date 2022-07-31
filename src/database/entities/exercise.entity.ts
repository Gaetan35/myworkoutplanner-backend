import { Column, Entity } from 'typeorm';
import { DatabaseEntity } from './database-entity';

export const exerciseTableName = 'exercises';

@Entity({ name: exerciseTableName })
export class Exercise extends DatabaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  difficulty: number;

  @Column({ nullable: false })
  description: string;

  public constructor(
    id: string,
    name: string,
    difficulty: number,
    description: string,
  ) {
    super();
    this.id = id;
    this.name = name;
    this.difficulty = difficulty;
    this.description = description;
  }
}
