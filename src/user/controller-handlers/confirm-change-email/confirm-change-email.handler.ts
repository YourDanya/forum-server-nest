import {Injectable} from '@nestjs/common'
import {UserService} from 'src/user/user.service'
import {CookieService} from 'src/utils/cookie/cookie.service'
import {UserRequest} from 'src/user/user.types'
import {Response} from 'express'
import * as crypto from 'crypto'
import {filterUser} from 'src/user/utils/filter-user/filter-user'
import {FilteredUser} from 'src/user/user.types'

@Injectable()
export class ConfirmChangeEmailHandler {
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

        const updatedUser = await this.userService.updateOne({
            _id: req.user._id, email: user.changeEmail,
            activateUserCode: null, resendActivateUser: null, activateUserExpires: null
        })

        this.cookieService.addCookie(res, 'user', {_id: updatedUser._id})

        this.sendSuccess(res, filterUser(updatedUser))
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