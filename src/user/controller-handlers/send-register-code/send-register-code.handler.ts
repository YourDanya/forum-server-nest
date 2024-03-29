import {Injectable} from '@nestjs/common'
import {User} from 'src/user/user.entity'
import {Response, Request} from 'express'
import {SendCodeService} from 'src/user/utils/send-code/send-code.service'

@Injectable()
export class SendRegisterCodeHandler {

    constructor(
        private sendCodeService: SendCodeService
    ) {}

    async handle(req: Request & { user: User }, res: Response) {
        const {user} = req

        if (!user) {
            return this.sendNoUserError(res)
        }

        if (user.active) {
            return this.sendUserActivatedError(res)
        }

        await this.sendCodeService.sendCode(req, res)

        this.sendSuccess(res)
    }

    sendNoUserError(res: Response) {
        res.status(400).json({
            message: {
                en: 'There\'s no user.',
                ru: 'Пользователя не существует'
            }
        })
    }

    sendUserActivatedError(res: Response) {
        res.status(400).json({
            message: {
                en: 'User already activated.',
                ru: 'Пользователь уже ативирован.'
            }
        })
    }

    sendSuccess(res: Response) {
        res.status(200).json({
            message: {
                en: 'Send code successfully.',
                ru: 'Код отправлен успешно.'
            },
            timer: 2 * 60 * 1000
        })
    }
}