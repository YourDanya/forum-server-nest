import {Injectable} from '@nestjs/common'
import * as crypto from 'crypto'
import {User} from 'src/user/user.entity'
import * as pug from 'pug'
import {Response, Request} from 'express'
import {MailService} from 'src/utils/mail/mail.service'
import {UserService} from 'src/user/user.service'

@Injectable()
export class SendRegisterCodeHandler {

    constructor(
        private userService: UserService,
        private mailService: MailService
    ) {}

    async handle(req: Request & { user: User }, res: Response) {
        const {user} = req

        if (!user) {
            return this.sendNoUserError(res)
        }

        if (user.active) {
            return this.sendUserActivatedError(res)
        }

        const activateCode = crypto.randomInt(10000, 99999).toString()
        const activateUserCode = crypto.createHash('sha256').update(activateCode).digest('hex')
        const activateUserExpires = Date.now() + 60 * 60 * 1000

        console.log('activateCode', activateCode)
        console.log('activateUserCode', activateUserCode)

        if (user.resendActivateUser > Date.now()) {
            const timer = user.resendActivateUser - Date.now()
            return this.sendTimerAwait(res, timer)
        }

        const html = pug.renderFile(
            `src/user/controller-handlers/send-register-code/send-register-code.pug`,
            {activateCode}
        )

        const resendActivateUser = Date.now() + 2 * 60 * 1000

        await this.userService.updateOne( {
            _id: user._id, activateUserCode, activateUserExpires, resendActivateUser
        })

        await this.mailService.sendMail({
            email: user.email, subject: 'User activation', html, text: ''
        })

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

    sendTimerAwait(res: Response, timer: number) {
        res.status(400).json({
            message: {
                en: `Wait ${timer}.`,
                ru: `Ожидайте ${timer}.`
            },
            timer
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