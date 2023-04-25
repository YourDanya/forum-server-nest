import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserController } from 'src/user/user.controller'
import { UserSchema } from 'src/user/user.schema'
import { MailService } from 'src/utils/mail/mail.service'
import { MailModule } from 'src/utils/mail/mail.module'
import { CookieModule } from 'src/utils/cookie/cookie.module'

@Module({
    imports: [MongooseModule.forFeature([{name: 'User', schema: UserSchema}]), MailModule, CookieModule],
    controllers: [UserController],
    providers: [MongooseModule],
    exports: [MongooseModule]
})
export class UserModule {}