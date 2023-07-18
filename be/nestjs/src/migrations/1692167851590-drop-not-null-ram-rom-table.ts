import { MigrationInterface, QueryRunner } from 'typeorm';

export class dropNotNullRamRomTable1692167851590 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "RamRom" ALTER COLUMN "ramId" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "RamRom" ALTER COLUMN "romId" DROP NOT NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "RamRom" ALTER COLUMN "ramId" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "RamRom" ALTER COLUMN "romId" SET NOT NULL',
    );
  }
}
