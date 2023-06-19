import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class ProductTable1684668450928 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Product',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          { name: 'name', type: 'varchar' },
          { name: 'slug', type: 'varchar' },
          { name: 'categoryId', type: 'uuid', isNullable: true },
          { name: 'price', type: 'float', default: 0 },
          { name: 'authId', type: 'uuid' },
          { name: 'isSale', type: 'boolean', default: false },
          { name: 'isActive', type: 'boolean', default: false },
          { name: 'isHot', type: 'boolean', default: false },
          { name: 'totalView', type: 'int', default: 0 },
          { name: 'description', type: 'varchar', isNullable: true },
          { name: 'avatar', type: 'varchar', isNullable: true },
          { name: 'descriptionSeo', type: 'varchar', isNullable: true },
          { name: 'keywordSeo', type: 'varchar', isNullable: true },
          { name: 'titleSeo', type: 'varchar', isNullable: true },
          { name: 'content', type: 'varchar', isNullable: true },
          { name: 'pay', type: 'int', isNullable: true },
          { name: 'number', type: 'int', isNullable: true },
          { name: 'totalRating', type: 'int', default: 0 },
          { name: 'totalNumber', type: 'int', default: 0 },
          { name: 'createdAt', type: 'timestamp', default: 'now()' },
          { name: 'updatedAt', type: 'timestamp', default: 'now()' },
          { name: 'deletedAt', type: 'timestamp', default: 'now()' },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Product');
  }
}
