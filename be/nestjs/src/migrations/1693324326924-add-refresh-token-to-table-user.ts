import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addRefreshTokenToTableUser1693324326924
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.addColumn(
      'User',
      new TableColumn({
        name: 'refreshToken',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('User', 'refreshToken');
  }
}
