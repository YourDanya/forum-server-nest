import {Injectable} from '@nestjs/common'
import {CreateThreadData} from 'src/thread/thread.types'
import {ThreadService} from 'src/thread/thread.service'
import {Inject} from '@nestjs/common'
import {createThreadQuery} from 'src/thread/thread.queries'
import {getThreadsQuery} from 'src/thread/thread.queries'
import {getThreadQuery} from 'src/thread/thread.queries'
import {Pool} from 'pg'

@Injectable()
export class ThreadPgService implements ThreadService{
    constructor(@Inject('PG_CONNECTION') private pool: Pool) {}
    async createThread(data: CreateThreadData) {
        const res = await this.pool.query(createThreadQuery, [data.name, data.description, data.authorId])
        return res.rows
    }

    async getThread() {
        const res = await this.pool.query(getThreadQuery)
        return res.rows
    }

    async getThreads(data: {prevId: number, perPage: number}) {
        const res = await this.pool.query(getThreadsQuery, [data.prevId, data.perPage])
        return res.rows
    }
}