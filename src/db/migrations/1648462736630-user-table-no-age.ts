import {MigrationInterface, QueryRunner} from "typeorm";

export class userTableNoAge1648462736630 implements MigrationInterface {
    name = 'userTableNoAge1648462736630'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "age"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "age" integer NOT NULL`);
    }

}
