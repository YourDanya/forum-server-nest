import { Schema } from '@nestjs/mongoose'
import { Prop } from '@nestjs/mongoose'
import { SchemaFactory } from '@nestjs/mongoose'
import { Thread } from 'src/thread/thread.schema'

@Schema()
export class User {
    @Prop()
    name: string

    @Prop()
    email: string

    @Prop()
    password: string

    @Prop()
    photoUrl: string

    @Prop({default(val: false): any {} })
    active: boolean
}

export const UserSchema = SchemaFactory.createForClass(User)