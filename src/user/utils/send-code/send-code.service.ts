import {Injectable} from '@nestjs/common'
import {UserService} from 'src/user/user.service'
import {MailService} from 'src/utils/mail/mail.service'
import crypto from 'crypto'
import {User} from 'src/user/user.entity'
import * as pug from 'pug'
import {Response, Request} from 'express'

@Injectable()
export class SendCodeService {
    constructor(
        private userService: UserService,
        private mailService: MailService
    ) {}

    async sendCode(req: Request & {user: User}, res: Response) {
        const {user} = req
        const activateCode = crypto.randomInt(10000, 99999).toString()
        const activateUserCode = crypto.createHash('sha256').update(activateCode).digest('hex')
        const activateUserExpires = Date.now() + 60 * 60 * 1000

        if (user.resendActivateUser > Date.now()) {
            const timer = user.resendActivateUser - Date.now()
            return this.sendTimerAwait(res, timer)
        }

        const html = pug.renderFile(
            `src/user/utils/send-code/send-code.pug`,
            {activateCode}
        )

        const resendActivateUser = Date.now() + 2 * 60 * 1000

        await this.userService.updateOne( {
            _id: user._id, activateUserCode, activateUserExpires, resendActivateUser
        })

        await this.mailService.sendMail({
            email: user.email, subject: 'User activation', html, text: ''
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
}

