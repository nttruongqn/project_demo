import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class AddColumnCartTable1687367248707 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'Cart',
      new TableColumn({
        name: 'userId',
        type: 'uuid',
        isNullable: true,
      }),
    ),
      await queryRunner.createForeignKey(
        'Cart',
        new TableForeignKey({
          columnNames: ['userId'],
          referencedTableName: 'User',
          referencedColumnNames: ['id'],
          onDelete: 'SET NULL',
        }),
      );

    await queryRunner.createIndex(
      'Cart',
      new TableIndex({
        columnNames: ['userId'],
        isUnique: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('Cart', 'userId');
  }
}
