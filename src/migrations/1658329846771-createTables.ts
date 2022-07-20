import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1658329846771 implements MigrationInterface {
    name = 'createTables1658329846771'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "isAdm" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "email_confirm" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email_confirm"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isAdm"`);
    }

}
