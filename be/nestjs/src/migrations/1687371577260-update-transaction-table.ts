import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTransactionTable1687371577260 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "Transaction" ALTER COLUMN "address" TYPE varchar',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "Transaction" ALTER COLUMN "address" TYPE integer',
    );
  }
}
