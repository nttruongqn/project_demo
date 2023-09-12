import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateBatteryCapacityTable1695368368889
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM "BatteryCapacity"');
    await queryRunner.query(
      'ALTER TABLE "BatteryCapacity" ALTER COLUMN "name" TYPE integer USING(name::integer)',
    );
    await queryRunner.query(
      `INSERT INTO "BatteryCapacity" ("id", "name") VALUES ('f9abe430-0c7f-49cb-9727-c0125c493083', 4500),('2c7c1373-0415-4029-90f8-8022198b3030', 5000),('3a32f9a7-ffec-4a14-a130-4a0208f93124', 4400),('f3d4c4e6-777c-4036-8389-28f4de3ec6a1', 3700),('7ad76f33-02f2-4444-8d0a-ff2162c54654', 3110), ('fa94cf02-2012-42a4-a76e-fc5141b1f8c1', 3150)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM "BatteryCapacity"');
    await queryRunner.query(
      'ALTER TABLE "BatteryCapacity" ALTER COLUMN "name" TYPE varchar',
    );
    await queryRunner.query(
      `INSERT INTO "BatteryCapacity" ("id", "name") VALUES ('f9abe430-0c7f-49cb-9727-c0125c493083', '4500 mAh',),('2c7c1373-0415-4029-90f8-8022198b3030', '5000 mAh'),('3a32f9a7-ffec-4a14-a130-4a0208f93124', '4400 mAh'),('f3d4c4e6-777c-4036-8389-28f4de3ec6a1', '3700 mAh'),('7ad76f33-02f2-4444-8d0a-ff2162c54654','3110 mAh'),('fa94cf02-2012-42a4-a76e-fc5141b1f8c1', '3150 mAh'),('02d91880-02b9-4555-ba8f-f659e6e08496', 'Đang cập nhật')`,
    );
  }
}
