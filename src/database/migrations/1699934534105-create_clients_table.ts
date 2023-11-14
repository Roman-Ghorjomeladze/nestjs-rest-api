import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateClientsTable1699934534105 implements MigrationInterface {
  name = 'CreateClientsTable1699934534105';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "client" (
                "id" SERIAL NOT NULL,
                "fullName" character varying NOT NULL,
                "userId" integer NOT NULL,
                "avatarId" integer NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"),
                CONSTRAINT "FK_client_user" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT "FK_client_avatar" FOREIGN KEY ("avatarId") REFERENCES "photo"("id") ON DELETE CASCADE ON UPDATE CASCADE
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "photo" ADD CONSTRAINT "FK_1234567890abcdef" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE CASCADE
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "photo" DROP CONSTRAINT "FK_1234567890abcdef"
    `);
    await queryRunner.query(`DROP TABLE "client"`);
  }
}
