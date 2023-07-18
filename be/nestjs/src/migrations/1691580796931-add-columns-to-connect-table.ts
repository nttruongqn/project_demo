import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addColumnsToConnectTable1691580796931
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('Connect', [
      new TableColumn({
        name: 'createdAt',
        type: 'timestamp',
        default: 'now()',
      }),
      new TableColumn({
        name: 'updatedAt',
        type: 'timestamp',
        default: 'now()',
      }),
      new TableColumn({
        name: 'deletedAt',
        type: 'timestamp',
        default: 'now()',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('Connect', 'createdAt');
    await queryRunner.dropColumn('Connect', 'updatedAt');
    await queryRunner.dropColumn('Connect', 'deletedAt');
  }
}
