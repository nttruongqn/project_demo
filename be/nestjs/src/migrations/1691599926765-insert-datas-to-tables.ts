import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertDatasToTables1691599926765 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO "Design" ("name")
        VALUES ('Nguyên khối')
        `);

    await queryRunner.query(`INSERT INTO "Resolution" ("name")
        VALUES ('Full HD+ (1080 x 2340 Pixels)'),
        ('FHD+'),
        ('1080 x 2400 pixels'),
        ('1290 x 2796 pixels'),
        ('1170 x 2532 Pixels'),
        ('1242 x 2688 pixels')`);

    await queryRunner.query(`DELETE FROM "WideScreen" `);

    await queryRunner.query(`INSERT INTO "WideScreen" ("name")
    VALUES ('6,4 inch'),
    ('6,6 inch'),
    ('Chính 7.6" & Phụ 6.2" - Tần số quét 120Hz'),
    ('6.1" - Tần số quét 120Hz'),
    ('6.7" - Tần số quét 120 Hz'),
    ('6.1 inches'),
    ('6.1" - Tần số quét 60 Hz'),
    ('6.1" - Tần số quét 120 Hz')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "Design" `);
    await queryRunner.query(`DELETE FROM "Resolution" `);
    await queryRunner.query(`DELETE FROM "WideScreen" `);
  }
}
