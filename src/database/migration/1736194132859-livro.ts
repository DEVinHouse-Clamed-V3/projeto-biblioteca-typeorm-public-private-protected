import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class livro1736194132859 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable
        (
            new Table({
                name: "livro",
                columns: 
                [{
                    name: 'id',
                    isPrimary: true,
                    type: 'serial'
                },
                {
                    name: 'titulo',
                    type: 'varchar',
                    length: '150',
                    isNullable: false
                },
                {
                    name: 'descricao',
                    type: 'text'
                },
                {
                    name: 'data_publicacao',
                    type: 'date'
                },
                {
                    name:'isbn',
                    type: 'varchar',
                    length: '150'
                },
                {
                    name:'page_count',
                    type:'int'
                },
                {
                    name: 'linguagem',
                    type: 'varchar',
                    length: '150'
                },
                {
                    name: 'created_at',
                    type: 'CURRENT_TIMESTAMP'
                },
                {
                    name: 'updated_at',
                    type: 'CURRENT_TIMESTAMP'
                }          
            ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
