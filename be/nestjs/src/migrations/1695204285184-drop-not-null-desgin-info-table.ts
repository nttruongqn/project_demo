import { MigrationInterface, QueryRunner } from 'typeorm';

export class dropNotNullDesginInfoTable1695204285184
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "DesignInfo" ALTER COLUMN "weightId" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "DesignInfo" ALTER COLUMN "sizeId" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "DesignInfo" ALTER COLUMN "materialId" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "DesignInfo" ALTER COLUMN "designId" DROP NOT NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "DesignInfo" ALTER COLUMN "weightId" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "DesignInfo" ALTER COLUMN "sizeId" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "DesignInfo" ALTER COLUMN "materialId" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "DesignInfo" ALTER COLUMN "designId" SET NOT NULL',
    );
  }
}
