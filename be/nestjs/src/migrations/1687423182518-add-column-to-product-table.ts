import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnToProductTable1687423182518
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tableName = '"Product"';
    const columnName = '"sale"';
    const columnType = 'float';

    await queryRunner.query(`ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${columnType} DEFAULT 0
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const tableName = '"Product"';
    const columnName = '"sale"';
    await queryRunner.query(`ALTER TABLE ${tableName} DROP COLUMN ${columnName}
    `);
  }
}
