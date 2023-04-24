import { ThreadController } from 'src/thread/thread.controller'
import { ThreadService } from 'src/thread/thread.service'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ThreadSchema } from 'src/thread/thread.schema'

@Module({
    imports: [MongooseModule.forFeature([{name: 'Thread', schema: ThreadSchema}])],
    controllers: [ThreadController],
    providers: [ThreadService, MongooseModule]
})
export class ThreadModule {}