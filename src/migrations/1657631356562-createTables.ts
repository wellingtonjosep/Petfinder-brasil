import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1657631356562 implements MigrationInterface {
    name = 'createTables1657631356562'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "animals" ("id" uuid NOT NULL, "name" character varying NOT NULL, "breed" character varying NOT NULL, "species" character varying NOT NULL, "description" character varying NOT NULL, "image" character varying NOT NULL, "lastLocation" character varying NOT NULL, "date" character varying NOT NULL, "found" boolean NOT NULL, "userId" uuid, CONSTRAINT "PK_6154c334bbb19186788468bce5c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "contact" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "animals" ADD CONSTRAINT "FK_d5b0e9fd87c1b1daf0d88a5012b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "animals" DROP CONSTRAINT "FK_d5b0e9fd87c1b1daf0d88a5012b"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "animals"`);
    }

}
