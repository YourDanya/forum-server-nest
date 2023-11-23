import { Module } from '@nestjs/common'
import { NestModule } from '@nestjs/common'
import { MiddlewareConsumer } from '@nestjs/common'
import { UserController } from 'src/user/user.controller'
import { MailModule } from 'src/utils/mail/mail.module'
import { CookieModule } from 'src/utils/cookie/cookie.module'
import { GetUserMiddleware } from 'src/user/user.middleware'
import { NotLoginedMiddleware } from 'src/user/user.middleware'
import {DatabaseModule} from 'src/database/database.module'
import {userProviders} from 'src/user/user.providers'
import {UserService} from 'src/user/user.service'
import {RegisterHandler} from 'src/user/controller-handlers/register/register.handler'

@Module({
    imports: [MailModule, CookieModule, DatabaseModule],
    controllers: [UserController],
    providers: [...userProviders],
    exports: [UserService]
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