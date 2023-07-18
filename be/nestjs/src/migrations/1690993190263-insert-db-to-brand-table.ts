import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertDbToBrandTable1690993190263 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO "Brand" ("brandName", "brandImageUrl")
        VALUES 
        ('Iphone','https://firebasestorage.googleapis.com/v0/b/nestjs-demo-b4e17.appspot.com/o/images%2Fphone_brand%2F1690992731347_brand-iphone.webp?alt=media&token=2b508eda-32fd-4cd9-a1d9-5529b8845cef'),
        ('Samsung','https://firebasestorage.googleapis.com/v0/b/nestjs-demo-b4e17.appspot.com/o/images%2Fphone_brand%2F1690992760960_brand-samsung.webp?alt=media&token=8c12986e-fb82-42ed-b0e4-3077e2179c6e'),
        ('Oppo','https://firebasestorage.googleapis.com/v0/b/nestjs-demo-b4e17.appspot.com/o/images%2Fphone_brand%2F1690992755729_brand-oppo.webp?alt=media&token=be863b50-df26-437b-98b6-9c17e0e01a2d'),
        ('Xiaomi','https://firebasestorage.googleapis.com/v0/b/nestjs-demo-b4e17.appspot.com/o/images%2Fphone_brand%2F1690992764481_brand-xiaomi.webp?alt=media&token=fd113410-d395-471a-8a98-ed52573f179e')
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "Brand"`);
  }
}
