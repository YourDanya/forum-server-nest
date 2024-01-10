import {Injectable} from '@nestjs/common'
import {Response} from 'express'
import {UserRequest} from 'src/user/user.types'
import {SendCodeService} from 'src/user/utils/send-code/send-code.service'

@Injectable()
export class SendChangeEmailCodeHandler {

    constructor(
        private sendCodeService: SendCodeService
    ) {}

    async handle(req: UserRequest, res: Response) {
        const {user} = req

        if (!user || !user.active) {
            return this.sendNoUserError(res)
        }
        if (!user.changeEmail) {
            return this.sendNoChangeEmailError(res)
        }

        const sendCodeRes = await this.sendCodeService.sendCode(req, res)

        if (!sendCodeRes) return

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

    sendNoChangeEmailError(res: Response) {
        res.status(400).json({
            message: {
                en: 'There\'s no email provided for change.',
                ru: 'Электронная почта для внесения изменений не указана.'
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