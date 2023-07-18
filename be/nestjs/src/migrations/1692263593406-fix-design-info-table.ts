import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class fixDesignInfoTable1692263593406 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('DesignInfo', [
      new TableColumn({
        name: 'createdAt',
        type: 'timestamp',
        default: 'now()',
      }),
      new TableColumn({
        name: 'updatedAt',
        type: 'timestamp',
        default: 'now()',
      }),
      new TableColumn({
        name: 'deletedAt',
        type: 'timestamp',
        default: 'now()',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('DesignInfo', 'createdAt');
    await queryRunner.dropColumn('DesignInfo', 'updatedAt');
    await queryRunner.dropColumn('DesignInfo', 'deletedAt');
  }
}
