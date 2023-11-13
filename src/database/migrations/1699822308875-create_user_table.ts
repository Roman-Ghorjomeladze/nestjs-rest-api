import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUserTable1699822308875 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'user',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'firstName',
                    type: 'varchar',
                    length: '25'
                },
                {
                    name: 'lastName',
                    type: 'varchar',
                    length: '25'
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'password',
                    type: 'varchar',
                    length: '70'
                },
                {
                    name: 'role',
                    type: 'varchar',
                    length: '50'
                },
                {
                    name: 'active',
                    type: 'boolean',
                    default: true
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    default: "now()",
                },
                {
                    name: "updatedAt",
                    type: "timestamp",
                    default: "now()",
                    onUpdate: "now()"
                },
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user', true)
    }
}
