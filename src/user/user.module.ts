import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserController } from 'src/user/user.controller'
import { UserSchema } from 'src/user/user.schema'

@Module({
    imports: [MongooseModule.forFeature([{name: 'User', schema: UserSchema}])],
    controllers: [UserController],
    providers: [MongooseModule],
    exports: [MongooseModule]
})
export class ThreadModule {}