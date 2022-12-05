import { MigrationInterface, QueryRunner } from 'typeorm';

export class generatedMigration1670276974837 implements MigrationInterface {
  name = 'generatedMigration1670276974837';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" uuid NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "exercises_categories_categories" ("exercisesId" uuid NOT NULL, "categoriesId" uuid NOT NULL, CONSTRAINT "PK_2e68f8e2def1dc3b491f7ba870d" PRIMARY KEY ("exercisesId", "categoriesId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_cf271a103097a9c019ded8d4d6" ON "exercises_categories_categories" ("exercisesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_68083ad05b5ccc57425cfd409a" ON "exercises_categories_categories" ("categoriesId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "exercises_categories_categories" ADD CONSTRAINT "FK_cf271a103097a9c019ded8d4d60" FOREIGN KEY ("exercisesId") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercises_categories_categories" ADD CONSTRAINT "FK_68083ad05b5ccc57425cfd409a4" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "exercises_categories_categories" DROP CONSTRAINT "FK_68083ad05b5ccc57425cfd409a4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercises_categories_categories" DROP CONSTRAINT "FK_cf271a103097a9c019ded8d4d60"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_68083ad05b5ccc57425cfd409a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_cf271a103097a9c019ded8d4d6"`,
    );
    await queryRunner.query(`DROP TABLE "exercises_categories_categories"`);
    await queryRunner.query(`DROP TABLE "categories"`);
  }
}
