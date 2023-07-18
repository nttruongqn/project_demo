import { MigrationInterface, QueryRunner } from 'typeorm';

export class fixSomeIssues1691424630815 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "OrtherConnect" RENAME TO "OtherConnect"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Connect" RENAME COLUMN "ortherConnectId" TO "otherConnectId"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "OtherConnect" RENAME TO "OrtherConnect"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Connect" RENAME COLUMN "otherConnectId" TO "ortherConnectId"`,
    );
  }
}
