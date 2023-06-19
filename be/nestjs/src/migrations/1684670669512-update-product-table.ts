import {
  MigrationInterface,
  QueryRunner,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class UpdateProductTable1684670669512 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'Product',
      new TableForeignKey({
        columnNames: ['authId'],
        referencedTableName: 'User',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'Product',
      new TableForeignKey({
        columnNames: ['categoryId'],
        referencedTableName: 'Category',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.createIndex(
      'Product',
      new TableIndex({
        columnNames: ['slug', 'authId', 'categoryId'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Product');
  }
}
