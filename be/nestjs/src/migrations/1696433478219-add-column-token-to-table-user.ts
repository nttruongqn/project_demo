import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addColumnTokenToTableUser1696433478219
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('User', [
      new TableColumn({
        name: 'token',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('User', 'token');
  }
}
