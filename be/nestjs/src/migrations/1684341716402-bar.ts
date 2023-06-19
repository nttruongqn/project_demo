// import { MigrationInterface, QueryRunner } from 'typeorm';

// export class bar1684341716402 implements MigrationInterface {
//   name = 'bar1684341716402';

//   public async up(queryRunner: QueryRunner): Promise<void> {
//     // await queryRunner.query(
//     //   `CREATE TABLE "person" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "age" integer NOT NULL, CONSTRAINT "PK_5fdaf670315c4b7e70cce85daa3" PRIMARY KEY ("id"))`,
//     // );
//     // await queryRunner.query(
//     //   `CREATE TABLE "car" ("id" SERIAL NOT NULL, "model" character varying NOT NULL, "make" character varying NOT NULL, "year" integer, "color" character varying, "personId" integer, CONSTRAINT "PK_55bbdeb14e0b1d7ab417d11ee6d" PRIMARY KEY ("id"))`,
//     // );
//     // await queryRunner.query(
//     //   `ALTER TABLE "car" ADD CONSTRAINT "FK_682034da8e53ef1bd0c679d63e0" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
//     // );
//   }

//   public async down(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.query(
//       `ALTER TABLE "car" DROP CONSTRAINT "FK_682034da8e53ef1bd0c679d63e0"`,
//     );
//     await queryRunner.query(`DROP TABLE "car"`);
//     await queryRunner.query(`DROP TABLE "person"`);
//   }
// }
