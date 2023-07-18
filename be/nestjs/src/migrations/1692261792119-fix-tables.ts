import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class fixTables1692261792119 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'MobileSystem',
      'FK_MobileSystem_DesignInfo',
    );
    await queryRunner.dropTable('DesignInfo');
    await queryRunner.dropTable('Material');
    await queryRunner.dropTable('Size');
    await queryRunner.dropTable('Weight');
    await queryRunner.dropTable('Design');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'MobileSystem',
      new TableForeignKey({
        name: 'FK_MobileSystem_DesignInfo',
        columnNames: ['designInfoId'],
        referencedTableName: 'DesignInfo',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
    await queryRunner.dropTable('DesignInfo');
    await queryRunner.dropTable('Material');
    await queryRunner.dropTable('Size');
    await queryRunner.dropTable('Weight');
    await queryRunner.dropTable('Design');
  }
}
