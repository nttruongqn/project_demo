import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addColumnsToRamRomTable1691580663547
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('RamRom', [
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
    await queryRunner.dropColumn('RamRom', 'createdAt');
    await queryRunner.dropColumn('RamRom', 'updatedAt');
    await queryRunner.dropColumn('RamRom', 'deletedAt');
  }
}
