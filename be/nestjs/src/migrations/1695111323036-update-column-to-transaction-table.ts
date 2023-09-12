import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class updateColumnToTransactionTable1695111323036
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.addColumn(
      'Transaction',
      new TableColumn({
        name: 'payments',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('Transaction', 'payments');
  }
}
