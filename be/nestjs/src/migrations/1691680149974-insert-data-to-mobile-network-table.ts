import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertDataToMobileNetworkTable1691680149974
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO "MobileNetwork" ("name")
        VALUES ('2G'),('3G'),('4G'),('5G'),('4G, 5G')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "MobileNetwork"`);
  }
}
