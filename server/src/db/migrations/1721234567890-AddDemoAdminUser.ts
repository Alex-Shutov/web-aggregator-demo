import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDemoAdminUser1721234567890 implements MigrationInterface {
    name = 'AddDemoAdminUser1721234567890'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "users" (
                "id",
                "email",
                "name",
                "surname",
                "patronymic",
                "password",
                "group",
                "role",
                "program",
                "level",
                "contacts"
            ) VALUES (
                uuid_generate_v4(),
                'admin',
                'Demo',
                'Admin',
                NULL,
                '$2b$10$23BupPPz5morjJoUcl.5lOX5r48s2S8iuQn97pEnmfBljBtZUq0Lu',
                'РИ-000000',
                'ADMIN',
                '09.03.01',
                '2',
                NULL
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "users" WHERE "email" = 'admin'`);
    }

}
