import { MigrationInterface, QueryRunner } from 'typeorm';

export class addColumnBrandIdToProductTable1690990714110
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const constraintName = '"FK_BRAND_PRODUCT"';
    const tableName = '"Product"';
    const columnName = '"brandId"';
    const columnType = 'uuid';
    const referencedTable = '"Brand"';
    const referencedColumn = '"id"';

    await queryRunner.query(
      `ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${columnType}`,
    );

    await queryRunner.query(`ALTER TABLE ${tableName}
    ADD CONSTRAINT ${constraintName} FOREIGN KEY (${columnName})
    REFERENCES ${referencedTable} (${referencedColumn});`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const tableName = '"Product"';
    const columnName = '"brandId"';
    await queryRunner.query(
      `ALTER TABLE ${tableName} DROP COLUMN ${columnName}`,
    );
  }
}
