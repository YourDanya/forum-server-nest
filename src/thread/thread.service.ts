import { Injectable } from '@nestjs/common'
import {CreateThreadData} from 'src/thread/thread.types'
import {ThreadPgService} from 'src/thread/services/thread-pg.service'
import {GetThreadData} from 'src/thread/thread.types'
import {GetThreadsData} from 'src/thread/thread.types'

@Injectable()
export abstract class ThreadService {
    abstract createThread(data: CreateThreadData)

    abstract getThread(data: GetThreadData)

    abstract getThreads(data: GetThreadsData)
}