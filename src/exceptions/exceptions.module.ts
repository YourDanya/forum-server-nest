import {Module} from '@nestjs/common'
import {APP_FILTER} from '@nestjs/core'
import {NotFoundExceptionFilter} from 'src/exceptions/not-found/not-found.exception'

@Module({
    providers: [
        {
            provide: APP_FILTER,
            useClass: NotFoundExceptionFilter
        }
    ]
})
export class ExceptionsModule {}