import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class updateMobileSystemTable1691405551102
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "designinfo" RENAME TO "DesignInfo"');

    await queryRunner.createForeignKey(
      'MobileSystem',
      new TableForeignKey({
        columnNames: ['designInfoId'],
        referencedTableName: 'DesignInfo',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('MobileSystem');
  }
}
