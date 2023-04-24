import { AppService } from 'src/app.service'
import { AppController } from 'src/app.controller'
import { Module } from '@nestjs/common'
import { ThreadController } from 'src/thread/thread.controller'
import { ThreadService } from 'src/thread/thread.service'
import {ThreadModule} from 'src/thread/thread.module'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { MailService } from 'src/utils/mails/mail.service'

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGODB),
        ThreadModule,
    ],
    providers: [
        MailService
    ],
    exports: [
        MailService
    ]
})

export class AppModule {}
