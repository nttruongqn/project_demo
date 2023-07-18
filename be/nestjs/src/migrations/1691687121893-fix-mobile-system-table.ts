import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class fixMobileSystemTable1691687121893 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('MobileSystem');

    await queryRunner.createTable(
      new Table({
        name: 'MobileSystem',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          { name: 'screenId', type: 'uuid', isNullable: true },
          { name: 'rearCameraId', type: 'uuid', isNullable: true },
          { name: 'frontCameraId', type: 'uuid', isNullable: true },
          { name: 'operationSystemCPUGPUId', type: 'uuid', isNullable: true },
          { name: 'ramRomId', type: 'uuid', isNullable: true },
          { name: 'connectId', type: 'uuid', isNullable: true },
          { name: 'batteryId', type: 'uuid', isNullable: true },
          { name: 'designInfoId', type: 'uuid', isNullable: true },
          { name: 'createdAt', type: 'timestamp', default: 'now()' },
          { name: 'updatedAt', type: 'timestamp', default: 'now()' },
          { name: 'deletedAt', type: 'timestamp', default: 'now()' },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'MobileSystem',
      new TableForeignKey({
        name: 'FK_MobileSystem_Screen',
        columnNames: ['screenId'],
        referencedTableName: 'Screen',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'MobileSystem',
      new TableForeignKey({
        name: 'FK_MobileSystem_RearCamera',
        columnNames: ['rearCameraId'],
        referencedTableName: 'RearCamera',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'MobileSystem',
      new TableForeignKey({
        name: 'FK_MobileSystem_FrontCamera',
        columnNames: ['frontCameraId'],
        referencedTableName: 'FrontCamera',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'MobileSystem',
      new TableForeignKey({
        name: 'FK_MobileSystem_OsCPUGPU',
        columnNames: ['operationSystemCPUGPUId'],
        referencedTableName: 'OperationSystemCPUGPU',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'MobileSystem',
      new TableForeignKey({
        name: 'FK_MobileSystem_RamRom',
        columnNames: ['ramRomId'],
        referencedTableName: 'RamRom',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'MobileSystem',
      new TableForeignKey({
        name: 'FK_MobileSystem_Connect',
        columnNames: ['connectId'],
        referencedTableName: 'Connect',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'MobileSystem',
      new TableForeignKey({
        name: 'FK_MobileSystem_Battery',
        columnNames: ['batteryId'],
        referencedTableName: 'Battery',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );

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

    await queryRunner.addColumn(
      'Product',
      new TableColumn({
        name: 'mobileSystemId',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'Product',
      new TableForeignKey({
        name: 'FK_Product_MobileSystem',
        columnNames: ['mobileSystemId'],
        referencedTableName: 'MobileSystem',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('MobileSystem');
    await queryRunner.dropColumn('Product', 'mobileSystemId');
  }
}
