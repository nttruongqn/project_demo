import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addColumnStatusToTableUser1696434639782
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('User', [
      new TableColumn({
        name: 'status',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('User', 'status');
  }
}
