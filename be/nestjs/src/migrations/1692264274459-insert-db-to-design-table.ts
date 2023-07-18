import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertDbToDesignTable1692264274459 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO "Design" ("name")
        VALUES ('Nguyên khối')
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "Design"`);
  }
}
