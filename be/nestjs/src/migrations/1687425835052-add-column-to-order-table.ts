import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnToOrderTable1687425835052 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tableName = '"Order"';
    const columnName = '"sale"';
    const columnType = 'float';

    await queryRunner.query(`ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${columnType} DEFAULT 0
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const tableName = '"Order"';
    const columnName = '"sale"';
    await queryRunner.query(`ALTER TABLE ${tableName} DROP COLUMN ${columnName}
        `);
  }
}
