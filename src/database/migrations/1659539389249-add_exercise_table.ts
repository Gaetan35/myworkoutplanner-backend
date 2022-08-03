import { MigrationInterface, QueryRunner } from 'typeorm';

export class generatedMigration1659539389249 implements MigrationInterface {
  name = 'generatedMigration1659539389249';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "exercises" ("id" uuid NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "difficulty" integer NOT NULL, "description" character varying NOT NULL, "isTimeExercise" boolean NOT NULL, CONSTRAINT "PK_c4c46f5fa89a58ba7c2d894e3c3" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "exercises"`);
  }
}
