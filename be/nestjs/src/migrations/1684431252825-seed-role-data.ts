import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedRoleData1684431252825 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    INSERT INTO "Role" (name)
    VALUES ('admin'),('user')
  `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const query = `
      DELETE FROM Role
      WHERE name IN ('admin', 'user')
    `;

    await queryRunner.query(query);
  }
}
