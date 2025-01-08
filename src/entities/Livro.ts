import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity('Livro')
class Livro 
{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    titulo: string

    @Column()
    descricao: string

    @Column()
    data_publicacao: Date

    @Column()
    isbn: string

    @Column()
    page_count: number

    @Column()
    linguagem: string

    @Column()
    created_at: Date

    @Column()
    updated_at: Date



}

export default Livro;