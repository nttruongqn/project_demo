import { MigrationInterface, QueryRunner } from 'typeorm';

export class changeDatatypeColumnsProductTable1685887785285
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "Product" ALTER COLUMN "pay" TYPE integer USING(pay::integer)',
    );
    await queryRunner.query(
      'ALTER TABLE "Product" ALTER COLUMN "number" TYPE integer USING(number::integer)',
    );
    await queryRunner.query(
      'ALTER TABLE "Product" ALTER COLUMN "content" TYPE text',
    );
    await queryRunner.query(
      'ALTER TABLE "Product" ADD COLUMN "contentMarkdown" text',
    );
    await queryRunner.query(
      'ALTER TABLE "Product" RENAME COLUMN "content" TO "contentHTML"',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "Product" ALTER COLUMN "pay" TYPE varchar',
    );
    await queryRunner.query(
      'ALTER TABLE "Product" ALTER COLUMN "number" TYPE varchar',
    );
    await queryRunner.query(
      'ALTER TABLE "Product" ALTER COLUMN "content" TYPE varchar',
    );
    await queryRunner.query(
      'ALTER TABLE "Product" DROP COLUMN "contentMarkdown"',
    );
    await queryRunner.query(
      'ALTER TABLE "Product" RENAME COLUMN "contentHTML" TO "content"',
    );
  }
}
