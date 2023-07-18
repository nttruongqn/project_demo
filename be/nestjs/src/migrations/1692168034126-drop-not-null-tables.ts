import { MigrationInterface, QueryRunner } from 'typeorm';

export class dropNotNullTables1692168034126 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "OperationSystemCPUGPU" ALTER COLUMN "operationSystemId" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "OperationSystemCPUGPU" ALTER COLUMN "cpuId" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "OperationSystemCPUGPU" ALTER COLUMN "gpuId" DROP NOT NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "OperationSystemCPUGPU" ALTER COLUMN "operationSystemId" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "OperationSystemCPUGPU" ALTER COLUMN "cpuId" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "OperationSystemCPUGPU" ALTER COLUMN "gpuId" SET NOT NULL',
    );
  }
}
