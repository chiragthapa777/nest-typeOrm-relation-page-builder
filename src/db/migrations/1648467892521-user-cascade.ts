import {MigrationInterface, QueryRunner} from "typeorm";

export class userCascade1648467892521 implements MigrationInterface {
    name = 'userCascade1648467892521'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "createdAt" SET DEFAULT '"2022-03-28T11:44:52.786Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "createdAt" SET DEFAULT '2022-03-28'`);
    }

}
