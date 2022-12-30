import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { CreateExerciseDTO } from '../../exercise/dto/create-exercise.dto';
import { DatabaseEntity } from './database-entity';
import { Category } from './categories.entity';

export const exerciseTableName = 'exercises';

@Entity({ name: exerciseTableName })
export class Exercise extends DatabaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  difficulty: number;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  isTimeExercise: boolean;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];

  @Column({ nullable: true })
  imageUrl?: string;

  public constructor(
    id: string,
    name: string,
    difficulty: number,
    description: string,
    isTimeExercise: boolean,
    categories: Category[],
    imageUrl?: string,
  ) {
    super();
    this.id = id;
    this.name = name;
    this.difficulty = difficulty;
    this.description = description;
    this.isTimeExercise = isTimeExercise;
    this.categories = categories;
    this.imageUrl = imageUrl;
  }

  static fromDto(id: string, dto: CreateExerciseDTO) {
    return new Exercise(
      id,
      dto.name,
      dto.difficulty,
      dto.description,
      dto.isTimeExercise,
      [],
      '',
    );
  }
}
