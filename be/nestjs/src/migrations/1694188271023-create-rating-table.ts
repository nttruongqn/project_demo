import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createRatingTable1694188271023 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Rating',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          { name: 'productId', type: 'uuid', isNullable: true },
          { name: 'userId', type: 'uuid', isNullable: true },
          { name: 'ratingNumber', type: 'int', isNullable: true },
          { name: 'ratingContent', type: 'varchar', isNullable: true },
          { name: 'createdAt', type: 'timestamp', default: 'now()' },
          { name: 'updatedAt', type: 'timestamp', default: 'now()' },
          { name: 'deletedAt', type: 'timestamp', default: 'now()' },
        ],
      }),
    ),
      await queryRunner.createForeignKey(
        'Rating',
        new TableForeignKey({
          columnNames: ['productId'],
          referencedTableName: 'Product',
          referencedColumnNames: ['id'],
          onDelete: 'SET NULL',
        }),
      );

    await queryRunner.createForeignKey(
      'Rating',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedTableName: 'User',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Rating');
  }
}
