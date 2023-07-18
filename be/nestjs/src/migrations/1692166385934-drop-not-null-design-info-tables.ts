import { MigrationInterface, QueryRunner } from 'typeorm';

export class dropNotNullDesignInfoTables1692166385934
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "Weight" ALTER COLUMN "name" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "Size" ALTER COLUMN "name" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "Material" ALTER COLUMN "name" DROP NOT NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "Weight" ALTER COLUMN "name" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "Size" ALTER COLUMN "name" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "Material" ALTER COLUMN "name" SET NOT NULL',
    );
  }
}
