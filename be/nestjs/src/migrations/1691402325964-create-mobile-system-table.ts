import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createMobileSystemTable1691402325964
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "DesginInfo" RENAME TO DesignInfo');

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
          { name: 'productId', type: 'uuid', isNullable: true },
          { name: 'screenId', type: 'uuid', isNullable: true },
          { name: 'rearCameraId', type: 'uuid', isNullable: true },
          { name: 'frontCameraId', type: 'uuid', isNullable: true },
          { name: 'operationSystemCPUGPUId', type: 'uuid', isNullable: true },
          { name: 'ramRomId', type: 'uuid', isNullable: true },
          { name: 'connectId', type: 'uuid', isNullable: true },
          { name: 'batteryId', type: 'uuid', isNullable: true },
          { name: 'designInfoId', type: 'uuid', isNullable: true },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'MobileSystem',
      new TableForeignKey({
        columnNames: ['productId'],
        referencedTableName: 'Product',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'MobileSystem',
      new TableForeignKey({
        columnNames: ['screenId'],
        referencedTableName: 'Screen',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'MobileSystem',
      new TableForeignKey({
        columnNames: ['rearCameraId'],
        referencedTableName: 'RearCamera',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'MobileSystem',
      new TableForeignKey({
        columnNames: ['frontCameraId'],
        referencedTableName: 'FrontCamera',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'MobileSystem',
      new TableForeignKey({
        columnNames: ['operationSystemCPUGPUId'],
        referencedTableName: 'OperationSystemCPUGPU',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'MobileSystem',
      new TableForeignKey({
        columnNames: ['ramRomId'],
        referencedTableName: 'RamRom',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'MobileSystem',
      new TableForeignKey({
        columnNames: ['connectId'],
        referencedTableName: 'Connect',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'MobileSystem',
      new TableForeignKey({
        columnNames: ['batteryId'],
        referencedTableName: 'Battery',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('MobileSystem');
  }
}
