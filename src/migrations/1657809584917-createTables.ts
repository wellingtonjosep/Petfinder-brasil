import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1657809584917 implements MigrationInterface {
    name = 'createTables1657809584917'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userName" character varying NOT NULL, "comment" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, "userId" uuid, "animalId" uuid, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "animals_comments_comments" ("animalsId" uuid NOT NULL, "commentsId" uuid NOT NULL, CONSTRAINT "PK_9f26c7fd1d5869e07962f05b5d9" PRIMARY KEY ("animalsId", "commentsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_613a15b339fb145e7374abf863" ON "animals_comments_comments" ("animalsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d275e026b31e29152a66fe2940" ON "animals_comments_comments" ("commentsId") `);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_b0d87b87918d48683771e19401d" FOREIGN KEY ("animalId") REFERENCES "animals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "animals_comments_comments" ADD CONSTRAINT "FK_613a15b339fb145e7374abf8637" FOREIGN KEY ("animalsId") REFERENCES "animals"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "animals_comments_comments" ADD CONSTRAINT "FK_d275e026b31e29152a66fe29401" FOREIGN KEY ("commentsId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "animals_comments_comments" DROP CONSTRAINT "FK_d275e026b31e29152a66fe29401"`);
        await queryRunner.query(`ALTER TABLE "animals_comments_comments" DROP CONSTRAINT "FK_613a15b339fb145e7374abf8637"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_b0d87b87918d48683771e19401d"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d275e026b31e29152a66fe2940"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_613a15b339fb145e7374abf863"`);
        await queryRunner.query(`DROP TABLE "animals_comments_comments"`);
        await queryRunner.query(`DROP TABLE "comments"`);
    }

}
