import {MigrationInterface, QueryRunner} from "typeorm";

export class tagPost1648538687302 implements MigrationInterface {
    name = 'tagPost1648538687302'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tag" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_6a9775008add570dc3e5a0bab7b" UNIQUE ("name"), CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag_posts_post" ("tagId" integer NOT NULL, "postId" integer NOT NULL, CONSTRAINT "PK_3f7aba2d3af1f3576095f7666ce" PRIMARY KEY ("tagId", "postId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6c2f3fa276343c3a11f5520cbe" ON "tag_posts_post" ("tagId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c43864658728381c39e8df1803" ON "tag_posts_post" ("postId") `);
        await queryRunner.query(`CREATE TABLE "post_tags_tag" ("postId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_e9b7b8e6a07bdccb6a954171676" PRIMARY KEY ("postId", "tagId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b651178cc41334544a7a9601c4" ON "post_tags_tag" ("postId") `);
        await queryRunner.query(`CREATE INDEX "IDX_41e7626b9cc03c5c65812ae55e" ON "post_tags_tag" ("tagId") `);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "createdAt" SET DEFAULT '"2022-03-29T07:24:47.672Z"'`);
        await queryRunner.query(`ALTER TABLE "tag_posts_post" ADD CONSTRAINT "FK_6c2f3fa276343c3a11f5520cbe2" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tag_posts_post" ADD CONSTRAINT "FK_c43864658728381c39e8df18032" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_tags_tag" ADD CONSTRAINT "FK_b651178cc41334544a7a9601c45" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "post_tags_tag" ADD CONSTRAINT "FK_41e7626b9cc03c5c65812ae55e8" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post_tags_tag" DROP CONSTRAINT "FK_41e7626b9cc03c5c65812ae55e8"`);
        await queryRunner.query(`ALTER TABLE "post_tags_tag" DROP CONSTRAINT "FK_b651178cc41334544a7a9601c45"`);
        await queryRunner.query(`ALTER TABLE "tag_posts_post" DROP CONSTRAINT "FK_c43864658728381c39e8df18032"`);
        await queryRunner.query(`ALTER TABLE "tag_posts_post" DROP CONSTRAINT "FK_6c2f3fa276343c3a11f5520cbe2"`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "createdAt" SET DEFAULT '2022-03-28'`);
        await queryRunner.query(`DROP INDEX "public"."IDX_41e7626b9cc03c5c65812ae55e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b651178cc41334544a7a9601c4"`);
        await queryRunner.query(`DROP TABLE "post_tags_tag"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c43864658728381c39e8df1803"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6c2f3fa276343c3a11f5520cbe"`);
        await queryRunner.query(`DROP TABLE "tag_posts_post"`);
        await queryRunner.query(`DROP TABLE "tag"`);
    }

}
