import { MigrationInterface, QueryRunner } from 'typeorm';

export class generatedMigration1672413693469 implements MigrationInterface {
  name = 'generatedMigration1672413693469';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "exercises" ADD "imageUrl" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "exercises" DROP COLUMN "imageUrl"`);
  }
}
