import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addColumnsToMobileSystemTable1691577549538
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('MobileSystem', [
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
    await queryRunner.dropColumn('MobileSystem', 'createdAt');
    await queryRunner.dropColumn('MobileSystem', 'updatedAt');
    await queryRunner.dropColumn('MobileSystem', 'deletedAt');
  }
}
