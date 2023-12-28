import {Catch} from '@nestjs/common'
import {NotFoundException} from '@nestjs/common'
import {ExceptionFilter} from '@nestjs/common'
import {ArgumentsHost} from '@nestjs/common'

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
    catch(_exception: NotFoundException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const res = ctx.getResponse()
        res.status(404).json({
            message: {
                en: 'Page was not found.',
                ru: 'Страница не найдена.'
            }
        })
    }
}