import { ThreadController } from 'src/thread/thread.controller'
import { ThreadService } from 'src/thread/thread.service'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import {DatabaseModule} from 'src/database/database.module'
import {threadProviders} from 'src/thread/thread.providers'

@Module({
    imports: [DatabaseModule],
    controllers: [ThreadController],
    providers: [...threadProviders],
    exports: [ThreadService]
})
export class ThreadModule {}