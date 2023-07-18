import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addColumnsToScreenTable1691577860326
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('Screen', [
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
    await queryRunner.dropColumn('Screen', 'createdAt');
    await queryRunner.dropColumn('Screen', 'updatedAt');
    await queryRunner.dropColumn('Screen', 'deletedAt');
  }
}
