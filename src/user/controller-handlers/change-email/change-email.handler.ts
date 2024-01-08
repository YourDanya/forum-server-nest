import {Injectable} from '@nestjs/common'
import {CookieService} from 'src/utils/cookie/cookie.service'
import {Response, Request} from 'express'
import {User} from 'src/user/user.entity'
import {UserService} from 'src/user/user.service'
import {EmailChangeBody} from 'src/user/controller-handlers/register/register.types'
import * as crypto from 'crypto'
import {filterUser} from 'src/user/utils/filter-user/filter-user'
import {FilteredUser} from 'src/user/user.types'

@Injectable()
export class ChangeEmailHandler {
    constructor(
        private userService: UserService,
        private cookieService: CookieService
    ) {}
    async handle (req: Request<any, any, EmailChangeBody> & {user: User}, res: Response) {
        const {body: {password, email}, user} = req

        if (!user || !user.active) {
            return this.sendUserDoesntExistError(res)
        }

        const isMatch = user.password === crypto.createHash('sha256').update(password).digest('hex')
        if (!isMatch) {
            return this.sendIncorrectPasswordError(res)
        }

        const emailInUse = !!await this.userService.findOne({email})
        if (emailInUse) {
            return this.sendEmailInUseError(res)
        }

        this.cookieService.addCookie(res, 'user', {_id: user._id, changeEmail: email})
        this.sendSuccess(res,  filterUser(user))
    }

    sendUserDoesntExistError(res: Response) {
        res.status(400).json({
            message: {
                en: 'User does not exist.',
                ru: 'Пользователь не существует.'
            }
        })
    }

    sendIncorrectPasswordError(res: Response) {
        res.status(400).json({
            message: {
                en: 'User password is not correct.',
                ru: 'Пароль пользователя неверный.'
            }
        })
    }

    sendEmailInUseError(res: Response) {
        return res.status(400).json({
            message: {
                en: 'Provided email already in use.',
                ru: 'Предоставленная почта уже занята.'
            }
        })
    }

    sendSuccess(res: Response, user: FilteredUser) {
        res.status(200).json({
            message: 'Email changed successfully',
            user
        })
    }
}