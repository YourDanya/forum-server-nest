import { Schema } from '@nestjs/mongoose'
import { Prop} from '@nestjs/mongoose'
import { SchemaFactory } from '@nestjs/mongoose'
import { Thread } from 'src/thread/thread.schema'

@Schema()
export class User {
    _id: string

    @Prop()
    name: string

    @Prop()
    email: string

    @Prop()
    password: string

    @Prop()
    photoUrl: string

    @Prop({default(val: false): any {}})
    active: boolean

    @Prop()
    activateUserCode: string

    @Prop()
    activateUserExpires: number

    @Prop()
    resendActivateUser: number
}

export const UserSchema = SchemaFactory.createForClass(User)