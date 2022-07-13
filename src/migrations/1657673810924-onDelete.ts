import { MigrationInterface, QueryRunner } from "typeorm";

export class onDelete1657673810924 implements MigrationInterface {
    name = 'onDelete1657673810924'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_f33abf864c0504b6cb5097931a5"`);
        await queryRunner.query(`ALTER TABLE "animals" DROP CONSTRAINT "FK_d5b0e9fd87c1b1daf0d88a5012b"`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_f33abf864c0504b6cb5097931a5" FOREIGN KEY ("animalsId") REFERENCES "animals"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "animals" ADD CONSTRAINT "FK_d5b0e9fd87c1b1daf0d88a5012b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "animals" DROP CONSTRAINT "FK_d5b0e9fd87c1b1daf0d88a5012b"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_f33abf864c0504b6cb5097931a5"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`ALTER TABLE "animals" ADD CONSTRAINT "FK_d5b0e9fd87c1b1daf0d88a5012b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_f33abf864c0504b6cb5097931a5" FOREIGN KEY ("animalsId") REFERENCES "animals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
