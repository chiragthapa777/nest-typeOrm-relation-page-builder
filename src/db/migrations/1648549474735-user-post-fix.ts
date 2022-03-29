import {MigrationInterface, QueryRunner} from "typeorm";

export class userPostFix1648549474735 implements MigrationInterface {
    name = 'userPostFix1648549474735'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "createdAt" SET DEFAULT '"2022-03-29T10:24:35.001Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "createdAt" SET DEFAULT '2022-03-29'`);
    }

}
