import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1699822308875 implements MigrationInterface {
  name = 'CreateUserTable1699822308875';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "firstName" character varying(25) NOT NULL,
                "lastName" character varying(25) NOT NULL,
                "email" character varying NOT NULL,
                "password" character varying(70) NOT NULL,
                "role" character varying(20) NOT NULL,
                "active" boolean DEFAULT true,
                "createdAt" timestamp DEFAULT now(),
                "updatedAt" timestamp DEFAULT now(),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"),
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")
            );
            CREATE TRIGGER set_timestamp
            BEFORE
            UPDATE ON "user"
            FOR EACH ROW
            EXECUTE PROCEDURE trigger_set_timestamp();
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TRIGGER set_timestamp on "user";
            DROP TABLE "user";
        `);
  }
}
