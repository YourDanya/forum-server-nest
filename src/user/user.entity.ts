import {Entity, Column} from 'typeorm'
import {PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    _id: string

    @Column()
    name: string

    @Column({
        nullable: true
    })
    description: string | null

    @Column({
        nullable: true
    })
    birthDate: string | null

    @Column()
    email: string

    @Column()
    password: string

    @Column({
        nullable: true
    })
    photoUrl: string | null

    @Column({
        default: false
    })
    active: boolean

    @Column({
        nullable: true
    })
    activateUserCode: string | null

    @Column({
        nullable: true,
        type: 'bigint'
    })
    activateUserExpires: number | null

    @Column({
        nullable: true,
        type: 'bigint'
    })
    resendActivateUser: number | null
}