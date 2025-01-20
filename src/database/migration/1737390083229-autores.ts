import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class autores1737390083229 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "autores",
        columns: [
          {
            name: "id",
            isPrimary: true,
            type: "serial",
          },
          {
            name: "name",
            type: "varchar",
            length: "150",
            isNullable: false,
          },
          {
            name: "birthdate",
            type: "date",
          },
          {
            name: "biography",
            type: "text",
          },
          {
            name: "nationality",
            type: "varchar",
            length: "150",
            isNullable: false,
          },
          {
            name: "active",
            type: "boolean",
            default: true,
          },
          {
            name: "created_at",
            type: "timestamp",
          },
          {
            name: "updated_at",
            type: "timestamp",
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
