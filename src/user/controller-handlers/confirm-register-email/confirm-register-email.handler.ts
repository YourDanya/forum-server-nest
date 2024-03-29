import * as crypto from 'crypto'
import {Request, Response} from 'express'
import {User} from 'src/user/user.entity'
import {CookieService} from 'src/utils/cookie/cookie.service'
import {Injectable} from '@nestjs/common'
import {UserService} from 'src/user/user.service'
import {UserRequest} from 'src/user/user.types'
import {FilteredUser} from 'src/user/user.types'
import {filterUser} from 'src/user/utils/filter-user/filter-user'

@Injectable()
export class ConfirmRegisterEmailHandler {
    constructor(
        private userService: UserService,
        private cookieService: CookieService
    ) {}

    async handle(req: UserRequest, res: Response) {
        const {code} = req.body
        const {user} = req

        const isMatch = crypto.createHash('sha256').update(code).digest('hex') === user.activateUserCode
        const isValid = user.activateUserExpires > Date.now()

        if (!(isValid && isMatch)) {
            return this.sendInvalidError(res)
        }

        const password = crypto.createHash('sha256').update(user.password).digest('hex')
        const active = true

        await this.userService.updateOne({
            _id: req.user._id, password, active, activateUserCode: null, resendActivateUser: null,
            activateUserExpires: null
        })

        this.cookieService.addCookie(res, 'user', {_id: user._id})

        this.sendSuccess(res, filterUser(user))
    }

    sendInvalidError(res: Response) {
        res.status(400).json({
            message: {
                en: `The code is invalid or has expired.`,
                ru: 'Код неверный или истек.'
            }
        })
    }

    sendSuccess(res: Response, user: FilteredUser) {
        res.status(200).json({
            message: {
                en: 'User activated successfully.',
                ru: 'Пользователь успешно активирован.'
            },
            user
        })
    }
}
