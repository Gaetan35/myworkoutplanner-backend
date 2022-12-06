import { MigrationInterface, QueryRunner } from 'typeorm';

export class generatedMigration1670365736894 implements MigrationInterface {
  name = 'generatedMigration1670365736894';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "exercises" ADD "imageUrl" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "exercises" DROP COLUMN "imageUrl"`);
  }
}
