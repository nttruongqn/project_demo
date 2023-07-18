import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createBatteryTable1691142768216 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Battery',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          { name: 'batteryTypeId', type: 'uuid' },
          { name: 'batteryTechnologyId', type: 'uuid' },
          { name: 'batteryCapacityId', type: 'uuid' },
          { name: 'createdAt', type: 'timestamp', default: 'now()' },
          { name: 'updatedAt', type: 'timestamp', default: 'now()' },
          { name: 'deletedAt', type: 'timestamp', default: 'now()' },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'Battery',
      new TableForeignKey({
        columnNames: ['batteryTypeId'],
        referencedTableName: 'BatteryType',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'Battery',
      new TableForeignKey({
        columnNames: ['batteryTechnologyId'],
        referencedTableName: 'BatteryTechnology',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'Battery',
      new TableForeignKey({
        columnNames: ['batteryCapacityId'],
        referencedTableName: 'BatteryCapacity',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Battery');
  }
}
