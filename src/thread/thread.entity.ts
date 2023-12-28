import {Entity} from 'typeorm'
import {Column} from 'typeorm'

@Entity()
export class Thread {

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    authorId: string

    @Column({
        default: 0
    })
    likesCount: number

    @Column({
        default: 0
    })
    dislikesCount: number

    @Column({
        default: 0
    })
    postsCount: number

    @Column()
    createdAt: string
}