import { Module } from '@nestjs/common'
import {ThreadModule} from 'src/thread/thread.module'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from 'src/user/user.module'
import {ExceptionsModule} from 'src/exceptions/exceptions.module'
import {ParallelQueriesModule} from 'src/mock/parallel-queries/parallel-qeries.module'

@Module({
    imports: [
        ConfigModule.forRoot(),
        ExceptionsModule,
        ThreadModule,
        UserModule,
        ParallelQueriesModule
    ]
})

export class AppModule {}
