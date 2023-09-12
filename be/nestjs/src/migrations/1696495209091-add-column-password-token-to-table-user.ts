import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addColumnPasswordTokenToTableUser1696495209091
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('User', [
      new TableColumn({
        name: 'passwordToken',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('User', 'passwordToken');
  }
}
