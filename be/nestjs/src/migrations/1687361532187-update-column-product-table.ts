import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateColumnProductTable1687361532187
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Product" ALTER COLUMN "pay" SET DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE "Product" ALTER COLUMN "number" SET DEFAULT 0`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Product" ALTER COLUMN "pay" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "Product" ALTER COLUMN "number" DROP DEFAULT`,
    );
  }
}
