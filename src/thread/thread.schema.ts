import { HydratedDocument } from 'mongoose'
import { Prop } from '@nestjs/mongoose'
import { SchemaFactory } from '@nestjs/mongoose'
import { Schema } from '@nestjs/mongoose'

export type ThreadDocument = HydratedDocument<Thread>

@Schema()
export class Thread {
    @Prop()
    name: string

    @Prop()
    description: string

    @Prop()
    authorId: string

    @Prop()
    likesCount: number

    @Prop()
    dislikesCount: number

    @Prop()
    postsCount: number
}

export const ThreadSchema = SchemaFactory.createForClass(Thread)