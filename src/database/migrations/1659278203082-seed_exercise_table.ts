import { MigrationInterface, QueryRunner } from 'typeorm';
import * as uuid from 'uuid';

const rowsToInsert = [
  {
    id: uuid.v4(),
    name: 'Mountain Climber 1',
    difficulty: 1,
    description: 'Position pompe, montée de genou au niveau des bras',
  },
  {
    id: uuid.v4(),
    name: 'Mountain Climber 2',
    difficulty: 2,
    description: 'Position pompe, montée de genou au niveau du bras opposé',
  },
  {
    id: uuid.v4(),
    name: 'Burpees 1',
    difficulty: 1,
    description: 'Départ debout, descente squat, position pompe, monté squat',
  },
  {
    id: uuid.v4(),
    name: 'Burpees 2',
    difficulty: 2,
    description:
      'Départ debout, descente squat, position pompe, pompe, montée squat sauté',
  },
  {
    id: uuid.v4(),
    name: 'Burpees 3',
    difficulty: 3,
    description:
      'Départ debout, descente squat, position pompe, pompe, monté squat sauté groupé',
  },
];

export class seedExerciseTable1659278203082 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO exercises ("id", "name", "difficulty", "description") VALUES ${rowsToInsert
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
