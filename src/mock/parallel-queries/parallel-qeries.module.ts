import { Module } from '@nestjs/common'
import {DatabaseModule} from 'src/database/database.module'
import {ParallelQueriesController} from 'src/mock/parallel-queries/parallel-queries.controller'
import {ParallelQueriesService} from 'src/mock/parallel-queries/parallel-queries.service'

@Module({
    imports: [DatabaseModule],
    controllers: [ParallelQueriesController],
    providers: [ParallelQueriesService],
    exports: [ParallelQueriesService]
})
export class ParallelQueriesModule {}