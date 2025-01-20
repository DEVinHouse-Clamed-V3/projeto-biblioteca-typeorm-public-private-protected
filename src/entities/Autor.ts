import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Autor')
class Autor {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    name: string

    @Column()
    birthdate: Date

    @Column()
    biography: string

    @Column()
    nationality: string

    @Column()
    active: boolean

    @Column()
    created_at: Date

    @Column()
    updated_at: Date
}

export default Autor;