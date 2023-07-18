import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createOperationSystemCpuGpuTable1691140075392
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'OperationSystemCPUGPU',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          { name: 'operationSystemId', type: 'uuid' },
          { name: 'cpuId', type: 'uuid' },
          { name: 'gpuId', type: 'uuid' },
          { name: 'createdAt', type: 'timestamp', default: 'now()' },
          { name: 'updatedAt', type: 'timestamp', default: 'now()' },
          { name: 'deletedAt', type: 'timestamp', default: 'now()' },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'OperationSystemCPUGPU',
      new TableForeignKey({
        columnNames: ['operationSystemId'],
        referencedTableName: 'OperationSystem',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'OperationSystemCPUGPU',
      new TableForeignKey({
        columnNames: ['cpuId'],
        referencedTableName: 'CPU',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'OperationSystemCPUGPU',
      new TableForeignKey({
        columnNames: ['gpuId'],
        referencedTableName: 'GPU',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('OperationSystemCPUGPU');
  }
}
