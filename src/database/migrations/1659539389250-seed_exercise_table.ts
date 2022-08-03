import { MigrationInterface, QueryRunner } from 'typeorm';
import * as uuid from 'uuid';

const rowsToInsert = [
  {
    id: uuid.v4(),
    name: 'Mountain Climber 1',
    difficulty: 1,
    description: 'Position pompe, montée de genou au niveau des bras',
    isTimeExercise: false,
  },
  {
    id: uuid.v4(),
    name: 'Mountain Climber 2',
    difficulty: 2,
    description: 'Position pompe, montée de genou au niveau du bras opposé',
    isTimeExercise: false,
  },
  {
    id: uuid.v4(),
    name: 'Burpees 1',
    difficulty: 1,
    description: 'Départ debout, descente squat, position pompe, monté squat',
    isTimeExercise: false,
  },
  {
    id: uuid.v4(),
    name: 'Burpees 2',
    difficulty: 2,
    description:
      'Départ debout, descente squat, position pompe, pompe, montée squat sauté',
    isTimeExercise: false,
  },
  {
    id: uuid.v4(),
    name: 'Burpees 3',
    difficulty: 3,
    description:
      'Départ debout, descente squat, position pompe, pompe, monté squat sauté groupé',
    isTimeExercise: false,
  },
  {
    id: uuid.v4(),
    name: 'Planche-1',
    difficulty: 3,
    description: 'Gainage position planche',
    isTimeExercise: true,
  },
  {
    id: uuid.v4(),
    name: 'Side-Planche',
    difficulty: 3,
    description: 'Gainage de coté sur un coude',
    isTimeExercise: true,
  },
  {
    id: uuid.v4(),
    name: 'Chaise',
    difficulty: 3,
    description: 'Position chaise contre un mur',
    isTimeExercise: true,
  },
];

export class seedExerciseTable1659539389250 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO exercises ("id", "name", "difficulty", "description", "isTimeExercise") VALUES ${rowsToInsert
        .map(
          (row) =>
            `(${Object.values(row)
              .map((value) =>
                typeof value === 'string' ? `'${value}'` : value,
              )
              .join(',')})`,
        )
        .join(',')};`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM exercises');
  }
}
