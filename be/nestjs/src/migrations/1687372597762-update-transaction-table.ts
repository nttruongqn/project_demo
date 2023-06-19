import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTransactionTable1687372597762 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const indexName = '"IDX_USER_TRANSACTION"';
    const tableName = '"Transaction"';
    const columnName = '"userId"';
    const columnType = 'uuid';

    await queryRunner.query(
      `ALTER TABLE ${tableName} DROP COLUMN ${columnName}`,
    );
    await queryRunner.query(
      `ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${columnType}`,
    );
    await queryRunner.query(
      `CREATE INDEX ${indexName} ON ${tableName} (${columnName})`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const tableName = 'Transaction';
    const columnName = 'userId';

    await queryRunner.query(
      `ALTER TABLE ${tableName} DROP COLUMN ${columnName}`,
    );
  }
}
