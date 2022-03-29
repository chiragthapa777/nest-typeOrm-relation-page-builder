import {MigrationInterface, QueryRunner} from "typeorm";

export class tagPostFix1648541035788 implements MigrationInterface {
    name = 'tagPostFix1648541035788'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "createdAt" SET DEFAULT '"2022-03-29T08:03:56.048Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "createdAt" SET DEFAULT '2022-03-29'`);
    }

}
