import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTransactionTable1690347055114 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tableName = '"Transaction"';
    const columnName = '"fullName"';
    const columnType = 'varchar';

    await queryRunner.query(`ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${columnType}
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const tableName = '"Transaction"';
    const columnName = '"fullName"';
    await queryRunner.query(`ALTER TABLE ${tableName} DROP COLUMN ${columnName}
    `);
  }
}
