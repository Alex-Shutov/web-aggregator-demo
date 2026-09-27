import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedDemoContent1721234567891 implements MigrationInterface {
    name = 'SeedDemoContent1721234567891'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "events" ("id", "name", "status", "finishDate")
            VALUES (
                uuid_generate_v4(),
                'Демо семестр 2026',
                '0',
                NOW() + INTERVAL '30 days'
            )
        `);

        await queryRunner.query(`
            INSERT INTO "categories" ("id", "name", "parentId")
            VALUES
                (uuid_generate_v4(), 'Экшен', NULL),
                (uuid_generate_v4(), 'Головоломка', NULL),
                (uuid_generate_v4(), 'Платформер', NULL)
        `);

        await queryRunner.query(`
            INSERT INTO "project_roles" ("id", "role")
            VALUES
                (uuid_generate_v4(), 'Team Lead'),
                (uuid_generate_v4(), 'Developer'),
                (uuid_generate_v4(), 'Designer'),
                (uuid_generate_v4(), 'Artist')
        `);

        await queryRunner.query(`
            INSERT INTO "projects" ("id", "name", "description", "howToPlay", "gitLink", "rating", "status", "eventId")
            SELECT
                uuid_generate_v4(),
                'Демо проект',
                'Пример проекта для просмотра в демо-режиме',
                'Откройте Play, чтобы запустить игру после загрузки билда',
                'https://github.com/example/demo',
                10,
                'approved',
                e.id
            FROM "events" e
            WHERE e.name = 'Демо семестр 2026'
            LIMIT 1
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "projects" WHERE "name" = 'Демо проект'`);
        await queryRunner.query(`DELETE FROM "project_roles" WHERE "role" IN ('Team Lead', 'Developer', 'Designer', 'Artist')`);
        await queryRunner.query(`DELETE FROM "categories" WHERE "name" IN ('Экшен', 'Головоломка', 'Платформер')`);
        await queryRunner.query(`DELETE FROM "events" WHERE "name" = 'Демо семестр 2026'`);
    }

}
