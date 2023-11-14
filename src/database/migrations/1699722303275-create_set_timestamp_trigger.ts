import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSetTimestampTrigger1699926303275
  implements MigrationInterface
{
  name = 'CreateSetTimestampTrigger1699722303275';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE FUNCTION trigger_set_timestamp()
            RETURNS TRIGGER AS $$
            BEGIN
            NEW.updated_at = NOW();
            RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP function trigger_set_timestamp();
        `);
  }
}
