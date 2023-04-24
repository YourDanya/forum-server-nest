import { HydratedDocument } from 'mongoose'
import { Prop } from '@nestjs/mongoose'
import { SchemaFactory } from '@nestjs/mongoose'
import { Schema } from '@nestjs/mongoose'

@Schema()
export class Post {
    @Prop()
    text: string

    @Prop()
    authorId: string

    @Prop()
    thereadId: string

    @Prop()
    respondId: string

    @Prop()
    likesCount: number

    @Prop()
    dislikesCount: number

    @Prop()
    number: number
}

export const PostSchema = SchemaFactory.createForClass(Post)