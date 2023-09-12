import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class updateColumnToRatingTable1694418059378
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('Rating', [
      new TableColumn({
        name: 'fullName',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'phoneNumber',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('Rating', 'fullName');
    await queryRunner.dropColumn('Rating', 'phoneNumber');
  }
}
