import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addColumnTimestampToTableUser1696439826823
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('User', [
      new TableColumn({
        name: 'timestamp',
        type: 'timestamp',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('User', 'timestamp');
  }
}
