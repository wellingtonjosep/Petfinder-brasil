"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTable1658341856383 = void 0;
class createTable1658341856383 {
    constructor() {
        this.name = 'createTable1658341856383';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "isAdm" boolean NOT NULL, "password" character varying NOT NULL, "contact" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "email_confirm" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userName" character varying NOT NULL, "comment" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, "userId" uuid, "animalId" uuid, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "animals" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "breed" character varying NOT NULL, "species" character varying NOT NULL, "description" character varying NOT NULL, "image" character varying NOT NULL, "lastLocation" character varying NOT NULL, "lastDate" character varying NOT NULL, "found" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "userId" uuid, CONSTRAINT "PK_6154c334bbb19186788468bce5c" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "animals_comments_comments" ("animalsId" uuid NOT NULL, "commentsId" uuid NOT NULL, CONSTRAINT "PK_9f26c7fd1d5869e07962f05b5d9" PRIMARY KEY ("animalsId", "commentsId"))`);
            yield queryRunner.query(`CREATE INDEX "IDX_613a15b339fb145e7374abf863" ON "animals_comments_comments" ("animalsId") `);
            yield queryRunner.query(`CREATE INDEX "IDX_d275e026b31e29152a66fe2940" ON "animals_comments_comments" ("commentsId") `);
            yield queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_b0d87b87918d48683771e19401d" FOREIGN KEY ("animalId") REFERENCES "animals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "animals" ADD CONSTRAINT "FK_d5b0e9fd87c1b1daf0d88a5012b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "animals_comments_comments" ADD CONSTRAINT "FK_613a15b339fb145e7374abf8637" FOREIGN KEY ("animalsId") REFERENCES "animals"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
            yield queryRunner.query(`ALTER TABLE "animals_comments_comments" ADD CONSTRAINT "FK_d275e026b31e29152a66fe29401" FOREIGN KEY ("commentsId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "animals_comments_comments" DROP CONSTRAINT "FK_d275e026b31e29152a66fe29401"`);
            yield queryRunner.query(`ALTER TABLE "animals_comments_comments" DROP CONSTRAINT "FK_613a15b339fb145e7374abf8637"`);
            yield queryRunner.query(`ALTER TABLE "animals" DROP CONSTRAINT "FK_d5b0e9fd87c1b1daf0d88a5012b"`);
            yield queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_b0d87b87918d48683771e19401d"`);
            yield queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_d275e026b31e29152a66fe2940"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_613a15b339fb145e7374abf863"`);
            yield queryRunner.query(`DROP TABLE "animals_comments_comments"`);
            yield queryRunner.query(`DROP TABLE "animals"`);
            yield queryRunner.query(`DROP TABLE "comments"`);
            yield queryRunner.query(`DROP TABLE "user"`);
        });
    }
}
exports.createTable1658341856383 = createTable1658341856383;
