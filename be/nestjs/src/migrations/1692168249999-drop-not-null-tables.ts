import { MigrationInterface, QueryRunner } from 'typeorm';

export class dropNotNullTables1692168249999 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "Battery" ALTER COLUMN "batteryTypeId" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "Battery" ALTER COLUMN "batteryTechnologyId" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "Battery" ALTER COLUMN "batteryCapacityId" DROP NOT NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "Battery" ALTER COLUMN "batteryTypeId" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "Battery" ALTER COLUMN "batteryTechnologyId" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "Battery" ALTER COLUMN "batteryCapacityId" SET NOT NULL',
    );
  }
}
