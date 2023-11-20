import { Module } from '@nestjs/common'
import { NestModule } from '@nestjs/common'
import { MiddlewareConsumer } from '@nestjs/common'
import { RequestMethod } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserController } from 'src/user/user.controller'
import { UserSchema } from 'src/user/user.schema'
import { MailModule } from 'src/utils/mail/mail.module'
import { CookieModule } from 'src/utils/cookie/cookie.module'
import { GetUserMiddleware } from 'src/user/user.middleware'
import { NotLoginedMiddleware } from 'src/user/user.middleware'

@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), MailModule, CookieModule],
    controllers: [UserController],
    providers: [MongooseModule],
    exports: [MongooseModule]
})
export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(GetUserMiddleware)
            .forRoutes('user/data')
        consumer
            .apply(NotLoginedMiddleware)
            .forRoutes('user/data')
    }
}