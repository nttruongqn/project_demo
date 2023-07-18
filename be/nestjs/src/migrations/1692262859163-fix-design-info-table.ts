import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class fixDesignInfoTable1692262859163 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Weight',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          { name: 'createdAt', type: 'timestamp', default: 'now()' },
          { name: 'updatedAt', type: 'timestamp', default: 'now()' },
          { name: 'deletedAt', type: 'timestamp', default: 'now()' },
        ],
      }),
    );
    await queryRunner.createTable(
      new Table({
        name: 'Size',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          { name: 'createdAt', type: 'timestamp', default: 'now()' },
          { name: 'updatedAt', type: 'timestamp', default: 'now()' },
          { name: 'deletedAt', type: 'timestamp', default: 'now()' },
        ],
      }),
    );
    await queryRunner.createTable(
      new Table({
        name: 'Design',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          { name: 'createdAt', type: 'timestamp', default: 'now()' },
          { name: 'updatedAt', type: 'timestamp', default: 'now()' },
          { name: 'deletedAt', type: 'timestamp', default: 'now()' },
        ],
      }),
    );
    await queryRunner.createTable(
      new Table({
        name: 'Material',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          { name: 'createdAt', type: 'timestamp', default: 'now()' },
          { name: 'updatedAt', type: 'timestamp', default: 'now()' },
          { name: 'deletedAt', type: 'timestamp', default: 'now()' },
        ],
      }),
    );
    await queryRunner.createTable(
      new Table({
        name: 'DesignInfo',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          { name: 'weightId', type: 'uuid' },
          { name: 'sizeId', type: 'uuid' },
          { name: 'materialId', type: 'uuid' },
          { name: 'designId', type: 'uuid' },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'DesignInfo',
      new TableForeignKey({
        columnNames: ['weightId'],
        referencedTableName: 'Weight',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'DesignInfo',
      new TableForeignKey({
        columnNames: ['sizeId'],
        referencedTableName: 'Size',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
    await queryRunner.createForeignKey(
      'DesignInfo',
      new TableForeignKey({
        columnNames: ['designId'],
        referencedTableName: 'Design',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
    await queryRunner.createForeignKey(
      'DesignInfo',
      new TableForeignKey({
        columnNames: ['materialId'],
        referencedTableName: 'Material',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'MobileSystem',
      new TableForeignKey({
        name: 'FK_MobileSystem_DesignInfo',
        columnNames: ['designInfoId'],
        referencedTableName: 'DesignInfo',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Weight');
    await queryRunner.dropTable('Size');
    await queryRunner.dropTable('Design');
    await queryRunner.dropTable('Material');
    await queryRunner.dropTable('DesignInfo');
  }
}
