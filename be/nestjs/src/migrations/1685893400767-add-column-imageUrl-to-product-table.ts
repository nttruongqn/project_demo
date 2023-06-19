import { MigrationInterface, QueryRunner } from 'typeorm';

export class addColumnUrlImageToProductTable1685893400767
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "Product" ADD COLUMN "imageUrl" varchar',
    );
    await queryRunner.query(
      'ALTER TABLE "Product" RENAME COLUMN "avatar" TO "image"',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "Product" DROP COLUMN "imageUrl"');
    await queryRunner.query(
      'ALTER TABLE "Product" RENAME COLUMN "image" TO "avatar"',
    );
  }
}
