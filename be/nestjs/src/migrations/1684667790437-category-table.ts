import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CategoryTable1684667790437 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Category',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          { name: 'name', type: 'varchar', isUnique: true },
          { name: 'slug', type: 'varchar' },
          { name: 'icon', type: 'varchar', isNullable: true },
          { name: 'avatar', type: 'varchar', isNullable: true },
          { name: 'active', type: 'boolean', default: false },
          { name: 'totalProduct', type: 'int', default: 0 },
          { name: 'titleSeo', type: 'varchar', isNullable: true },
          { name: 'descriptionSeo', type: 'varchar', isNullable: true },
          { name: 'keywordSeo', type: 'varchar', isNullable: true },
          { name: 'createdAt', type: 'timestamp', default: 'now()' },
          { name: 'updatedAt', type: 'timestamp', default: 'now()' },
          { name: 'deletedAt', type: 'timestamp', default: 'now()' },
        ],
      }),
    );

    await queryRunner.createIndex(
      'Category',
      new TableIndex({
        columnNames: ['slug'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Category');
  }
}
