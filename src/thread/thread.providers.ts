import {DataSource} from 'typeorm'
import {Thread} from 'src/thread/thread.entity'
import {ThreadService} from 'src/thread/thread.service'
import {ThreadPgService} from 'src/thread/services/thread-pg.service'

export const threadProviders = [
    {
        provide: ThreadService,
        useClass: ThreadPgService
    }
]