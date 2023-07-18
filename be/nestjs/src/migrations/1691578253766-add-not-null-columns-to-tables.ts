import { MigrationInterface, QueryRunner } from 'typeorm';

export class addNotNullColumnsToTables1691578253766
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "Screen" ALTER COLUMN "wideScreenId" SET NOT NULL',
    );

    await queryRunner.query(
      'ALTER TABLE "Screen" ALTER COLUMN "resolutionId" SET NOT NULL',
    );

    await queryRunner.query(
      'ALTER TABLE "RearCamera" ALTER COLUMN "filmRearCameraId" SET NOT NULL',
    );

    await queryRunner.query(
      'ALTER TABLE "RearCamera" ALTER COLUMN "resolutionRearCameraId" SET NOT NULL',
    );

    await queryRunner.query(
      'ALTER TABLE "RearCamera" ALTER COLUMN "advancedShootingId" SET NOT NULL',
    );

    await queryRunner.query(
      'ALTER TABLE "FrontCamera" ALTER COLUMN "resolutionFrontCameraId" SET NOT NULL',
    );

    await queryRunner.query(
      'ALTER TABLE "FrontCamera" ALTER COLUMN "videoCallId" SET NOT NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "Screen" ALTER COLUMN "wideScreenId" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "Screen" ALTER COLUMN "resolutionId" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "RearCamera" ALTER COLUMN "filmRearCameraId" DROP NOT NULL',
    );

    await queryRunner.query(
      'ALTER TABLE "RearCamera" ALTER COLUMN "resolutionRearCameraId" DROP NOT NULL',
    );

    await queryRunner.query(
      'ALTER TABLE "RearCamera" ALTER COLUMN "advancedShootingId" DROP NOT NULL',
    );

    await queryRunner.query(
      'ALTER TABLE "FrontCamera" ALTER COLUMN "resolutionFrontCameraId" DROP NOT NULL',
    );

    await queryRunner.query(
      'ALTER TABLE "FrontCamera" ALTER COLUMN "videoCallId" DROP NOT NULL',
    );
  }
}
