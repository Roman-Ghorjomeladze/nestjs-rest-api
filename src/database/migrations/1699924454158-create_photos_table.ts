import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePhotosTable1699924454158 implements MigrationInterface {
  name = 'CreatePhotosTable1699924454158';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "photo" (
                "id" SERIAL NOT NULL,
                "url" character varying NOT NULL,
                "key" character varying NOT NULL,
                "etag" character varying NOT NULL,
                "clientId" integer,
                CONSTRAINT "PK_1234567890abcdef" PRIMARY KEY ("id")
            );
            CREATE TRIGGER set_timestamp
            BEFORE
            UPDATE ON "photo"
            FOR EACH ROW
            EXECUTE PROCEDURE trigger_set_timestamp();
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TRIGGER set_timestamp on "photo";
            DROP TABLE "photo";
        `);
  }
}
