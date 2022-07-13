import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1657673340384 implements MigrationInterface {
    name = 'createTables1657673340384'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "comment" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "animalsId" uuid, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "animals" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "breed" character varying NOT NULL, "species" character varying NOT NULL, "description" character varying NOT NULL, "image" character varying NOT NULL, "lastLocation" character varying NOT NULL, "lastDate" character varying NOT NULL, "found" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_6154c334bbb19186788468bce5c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "contact" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_f33abf864c0504b6cb5097931a5" FOREIGN KEY ("animalsId") REFERENCES "animals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "animals" ADD CONSTRAINT "FK_d5b0e9fd87c1b1daf0d88a5012b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "animals" DROP CONSTRAINT "FK_d5b0e9fd87c1b1daf0d88a5012b"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_f33abf864c0504b6cb5097931a5"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "animals"`);
        await queryRunner.query(`DROP TABLE "comments"`);
    }

}
