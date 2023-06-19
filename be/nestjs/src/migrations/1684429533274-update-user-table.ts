import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class UpdateUserTable1684429533274 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'User',
      new TableColumn({
        name: 'roleId',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'User',
      new TableForeignKey({
        columnNames: ['roleId'],
        referencedTableName: 'Role',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );

    const constraintName = queryRunner.connection.namingStrategy.foreignKeyName(
      'User',
      ['id'],
      'Role',
      ['roleId'],
    );
    console.log('constraint', constraintName);

    // await queryRunner.createIndex(
    //     'User',
    //     new TableIndex({
    //       columnNames: ['name'],
    //       isUnique: true,
    //     }),
    //   );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.dropIndex('users', 'IDX_users_name');
    // await queryRunner.dropForeignKey('User', 'FK_users_roleId_role');
    // await queryRunner.dropColumn('User', 'roleId');
    await queryRunner.dropTable('User');
  }
}
