import {Injectable} from '@nestjs/common'
import {UserService} from 'src/user/user.service'
import {MailService} from 'src/utils/mail/mail.service'
import * as crypto from 'crypto'
import {User} from 'src/user/user.entity'
import * as pug from 'pug'
import {Response, Request} from 'express'
import {UserRequest} from 'src/user/user.types'

@Injectable()
export class SendCodeService {
    constructor(
        private userService: UserService,
        private mailService: MailService
    ) {}

    async sendCode(req: UserRequest, res: Response) {
        const {user} = req
        const activateCode = crypto.randomInt(10000, 99999).toString()
        const activateUserCode = crypto.createHash('sha256').update(activateCode).digest('hex')
        const activateUserExpires = Date.now() + 60 * 60 * 1000

        // if (user.resendActivateUser > Date.now()) {
        //     const timer = user.resendActivateUser - Date.now()
        //     this.sendTimerAwait(res, timer)
        //     return false
        // }

        const html = pug.renderFile(
            `src/user/utils/send-code/send-code.pug`,
            {activateCode}
        )

        const resendActivateUser = Date.now() + 2 * 60 * 1000

        await this.userService.updateOne( {
            _id: user._id, activateUserCode, activateUserExpires, resendActivateUser
        })

        const email = user.changeEmail || user.email

        await this.mailService.sendMail({
            email, subject: 'User activation', html, text: ''
        })

        return true
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

