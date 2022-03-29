import {MigrationInterface, QueryRunner} from "typeorm";

export class userTableAge1648459563118 implements MigrationInterface {
    name = 'userTableAge1648459563118'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "age" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "age"`);
    }

}
