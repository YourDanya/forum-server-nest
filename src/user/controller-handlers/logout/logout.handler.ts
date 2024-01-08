import {Injectable} from '@nestjs/common'
import {CookieService} from 'src/utils/cookie/cookie.service'
import {Request} from 'express'
import {Response} from 'express'

@Injectable()
export class LogoutHandler {

    constructor(
        private cookieService: CookieService
    ) {}

    async handle(_req: Request, res: Response) {
        this.cookieService.removeCookie(res, 'user')
        this.sendSuccess(res)
    }

    sendSuccess(res: Response) {
        res.status(200).json({
            message: {
                en: 'Logged out successfully.',
                ru: 'Вы успешно вышли.'
            },
        })
    }
}